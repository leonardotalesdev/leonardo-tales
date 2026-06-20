# Leonardo Tales

**Leonardo Tales — Yapay Zekâ Ajan İşletim Sistemi**

Leonardo Tales is an MVP-stage website and AI discovery assistant concept for helping Turkish businesses understand where AI agents can improve customer support, sales, quoting, and operations.

The current site is a premium terminal-like AI operating system prototype. Preserve the existing dark grid, amber/green system colors, boot logs, command-line feel, and text-based wordmark.

## Product Focus

Initial market: Türkiye

Initial language: Turkish

Domain target: `leonardotales.com`

Product sequence:

1. AI Müşteri Temsilcisi + Website
2. AI Satış ve Teklif Sistemi
3. AI Operasyon Otomasyonu

MVP goal: a visitor enters the site, is greeted by the AI discovery assistant, explains their business and need, and the system classifies the lead into one of four paths:

1. AI Müşteri Temsilcisi + Website
2. AI Satış ve Teklif Sistemi
3. AI Operasyon Otomasyonu
4. Henüz Netleşmedi

The system should later collect contact information and store it as a lead.

## Current Routes

- `/` - Turkish homepage
- `/en` - English homepage
- `/manifesto` - Turkish manifesto
- `/en/manifesto` - English manifesto
- `/llms.txt` - AI-readable project summary
- `/robots.txt` - crawler rules
- `/sitemap.xml` - sitemap with Turkish and English routes

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- npm with `package-lock.json`

## Current Implementation Status

Working:

- Static bilingual marketing pages.
- Manifesto pages.
- SEO metadata, robots, and sitemap generation.
- Static infrastructure imagery under `public/images/infrastructure`.
- Client-side chat prototype in `src/components/CoreAiChat.tsx`.

Not implemented yet:

- Real LLM assistant.
- Lead classification logic.
- Contact form inside the chat panel.
- Supabase lead storage.
- Telegram or WhatsApp notifications.
- Pricing flow.

Do not claim these integrations are complete until they are implemented and verified.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Checks

```bash
npm run lint
npm run build
```

## Environment

The current visual prototype does not require private environment variables.

Set `NEXT_PUBLIC_SITE_URL` to the production origin before deployment if the final domain differs from `https://leonardotales.com`.

Never commit `.env*` files.

## Project OS Docs

Codex-readable project documentation lives in `docs/`.

Start with:

- `docs/00_PROJECT_BRIEF.md`
- `docs/03_MVP_SCOPE.md`
- `docs/05_TECHNICAL_ARCHITECTURE.md`
- `docs/11_DO_NOT_TOUCH.md`
