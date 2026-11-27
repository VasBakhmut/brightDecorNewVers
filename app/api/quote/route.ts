import { NextResponse } from "next/server";
import { deliver } from "@/lib/mail";

export const runtime = "nodejs";

type Body = Record<string, unknown>;

// Best-effort limiter (per server instance). Honeypot + timing checks below do the heavy lifting.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const s = (v: unknown, max = 300) => (typeof v === "string" ? v.trim().slice(0, max) : "");
// single-line fields: no line breaks, so nothing can be injected into mail headers
const line = (v: unknown, max = 300) => s(v, max).replace(/[\r\n\t<>"]+/g, " ").trim();
const esc = (v: string) => v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  let b: Body;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Bots: filled honeypot or submitted impossibly fast. Pretend success.
  if (s(b.website) || (typeof b.elapsed === "number" && b.elapsed < 2500)) return NextResponse.json({ ok: true });

  const lead = {
    name: line(b.name, 120),
    email: line(b.email, 200),
    phone: line(b.phone, 40),
    service: line(b.service, 60),
    suburb: line(b.suburb, 160),
    message: s(b.message, 2000),
  };

  if (!lead.name || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email) || lead.phone.replace(/\D/g, "").length < 8 || !lead.service) {
    return NextResponse.json({ error: "Please check your details" }, { status: 422 });
  }

  const rows: [string, string][] = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Service", lead.service],
    ["Suburb", lead.suburb || "—"],
    ["Project details", lead.message || "—"],
  ];
  const text = "New quote request from brightdecor.com.au\n\n" + rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<h2>New quote request</h2><table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif">${rows
    .map(([k, v]) => `<tr><td style="color:#666;vertical-align:top">${esc(k)}</td><td>${esc(v).replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table>`;

  const to = process.env.QUOTE_TO_EMAIL || "max@brightdecor.com.au";
  const result = await deliver({
    to,
    from: process.env.QUOTE_FROM_EMAIL || to,
    replyTo: { email: lead.email, name: lead.name },
    subject: `New quote request: ${lead.name}${lead.suburb ? ` (${lead.suburb})` : ""} - ${lead.service}`,
    text,
    html,
  });

  if (result === "sent") return NextResponse.json({ ok: true });

  if (result === "none" && process.env.NODE_ENV !== "production") {
    console.log("[quote] no delivery channel configured (dev), lead:\n" + text);
    return NextResponse.json({ ok: true });
  }
  console.error(result === "none" ? "[quote] no mail provider configured" : "[quote] all delivery channels failed");
  return NextResponse.json({ error: "Could not send your request" }, { status: result === "none" ? 503 : 502 });
}
