# Bright Decor

Website for Bright Decor, painters in Brisbane (residential, commercial and body corporate).

Built with Next.js (App Router), React, Tailwind CSS v4 and Motion.

## Getting started

```bash
pnpm install
cp .env.example .env.local   # then fill in the values
pnpm dev                     # http://localhost:3000
```

## Scripts

| Command          | What it does                                   |
| ---------------- | ---------------------------------------------- |
| `pnpm dev`       | Development server                             |
| `pnpm build`     | Production build                               |
| `pnpm start`     | Serve the production build                     |
| `pnpm typecheck` | TypeScript check                               |
| `pnpm images`    | Re-optimise photos from `Photos/` into `public/img` |

## Environment variables

See `.env.example`. The quote form needs one email provider (more than one can be set; every configured one is used):

- Brevo: `BREVO_API_KEY`
- Resend: `RESEND_API_KEY`
- Any SMTP mailbox: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
- Telegram (optional): `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`

Also set `QUOTE_TO_EMAIL` and `QUOTE_FROM_EMAIL` (the sender must be verified with the provider).
Set `NEXT_PUBLIC_SITE_URL` to the live domain (canonical URLs, sitemap and structured data).
Optional: `GOOGLE_SITE_VERIFICATION` adds the Search Console verification tag.

## Deploying

Import the repository into Vercel, add the environment variables above and deploy. No extra build settings are needed.
