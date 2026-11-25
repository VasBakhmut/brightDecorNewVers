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

See `.env.example`. The quote form needs at least one delivery channel:

- Brevo: `BREVO_API_KEY`, `QUOTE_TO_EMAIL`, `QUOTE_FROM_EMAIL`
- Telegram (optional): `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`

Set `NEXT_PUBLIC_SITE_URL` to the live domain (used for canonical URLs, sitemap and structured data).

## Deploying

Import the repository into Vercel, add the environment variables above and deploy. No extra build settings are needed.
