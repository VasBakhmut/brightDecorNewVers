import nodemailer from "nodemailer";

export type Mail = {
  to: string;
  from: string;
  replyTo: { email: string; name: string };
  subject: string;
  text: string;
  html: string;
};

/**
 * Each sender returns null when its provider is not configured,
 * true when the message was accepted, false when the provider failed.
 */
type Sender = (m: Mail) => Promise<boolean | null>;

const brevo: Sender = async (m) => {
  const key = process.env.BREVO_API_KEY;
  if (!key) return null;
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": key, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      sender: { name: "Bright Decor Website", email: m.from },
      to: [{ email: m.to }],
      replyTo: m.replyTo,
      subject: m.subject,
      textContent: m.text,
      htmlContent: m.html,
    }),
  });
  return res.ok;
};

const resend: Sender = async (m) => {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: `Bright Decor Website <${m.from}>`,
      to: [m.to],
      reply_to: m.replyTo.email,
      subject: m.subject,
      text: m.text,
      html: m.html,
    }),
  });
  return res.ok;
};

/** Any SMTP mailbox: Google Workspace, Microsoft 365, Zoho, GoDaddy, cPanel, Mailgun, SES... */
const smtp: Sender = async (m) => {
  const host = process.env.SMTP_HOST;
  if (!host) return null;
  const port = Number(process.env.SMTP_PORT || 587);
  const transport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
  });
  await transport.sendMail({
    from: `"Bright Decor Website" <${m.from}>`,
    to: m.to,
    replyTo: `"${m.replyTo.name.replace(/"/g, "")}" <${m.replyTo.email}>`,
    subject: m.subject,
    text: m.text,
    html: m.html,
  });
  return true;
};

const telegram = async (text: string): Promise<boolean | null> => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) return null;
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ chat_id: chat, text }),
  });
  return res.ok;
};

/**
 * Runs every configured channel. Returns:
 *  - "none"   nothing is configured
 *  - "failed" channels are configured but all of them failed
 *  - "sent"   at least one channel accepted the message
 */
export async function deliver(m: Mail): Promise<"none" | "failed" | "sent"> {
  const results = await Promise.allSettled([brevo(m), resend(m), smtp(m), telegram(`${m.subject}\n\n${m.text}`)]);
  const outcomes = results.map((r) => {
    if (r.status === "fulfilled") return r.value;
    console.error("[quote] channel error:", r.reason instanceof Error ? r.reason.message : r.reason);
    return false;
  });
  const configured = outcomes.filter((o) => o !== null);
  if (!configured.length) return "none";
  return configured.some(Boolean) ? "sent" : "failed";
}
