import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Body = Record<string, unknown>;

const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const s = (v: unknown, max = 300) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esc = (v: string) => v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function sendBrevo(lead: Lead, text: string, html: string) {
  const key = process.env.BREVO_API_KEY;
  if (!key) return null;
  const to = process.env.QUOTE_TO_EMAIL || "max@brightdecor.com.au";
  const from = process.env.QUOTE_FROM_EMAIL || to;
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": key, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      sender: { name: "Bright Decor Website", email: from },
      to: [{ email: to }],
      replyTo: { email: lead.email, name: lead.name },
      subject: `New quote request: ${lead.name}${lead.suburb ? ` (${lead.suburb})` : ""}`,
      textContent: text,
      htmlContent: html,
    }),
  });
  return res.ok;
}

async function sendTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) return null;
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ chat_id: chat, text }),
  });
  return res.ok;
}

type Lead = {
  name: string;
  email: string;
  phone: string;
  service: string;
  suburb: string;
  message: string;
};

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

  const lead: Lead = {
    name: s(b.name, 120),
    email: s(b.email, 200),
    phone: s(b.phone, 40),
    service: s(b.service, 60),
    suburb: s(b.suburb, 160),
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

  const results = await Promise.allSettled([sendBrevo(lead, text, html), sendTelegram(text)]);
  const outcomes = results.map((r) => (r.status === "fulfilled" ? r.value : false));
  const configured = outcomes.filter((o) => o !== null);

  if (configured.length === 0) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[quote] no delivery channel configured (dev) — lead:\n" + text);
      return NextResponse.json({ ok: true });
    }
    console.error("[quote] BREVO_API_KEY / TELEGRAM_* not set");
    return NextResponse.json({ error: "Could not send your request" }, { status: 503 });
  }
  if (!configured.some(Boolean)) {
    console.error("[quote] all delivery channels failed");
    return NextResponse.json({ error: "Could not send your request" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
