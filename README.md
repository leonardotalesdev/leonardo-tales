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

The system collects contact information through the chat panel and submits it through the server-side lead API.

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
- Deterministic customer representative assistant in `src/components/CoreAiChat.tsx`.
- In-chat lead capture form submitted through `POST /api/leads`.
- Server-side lead validation.
- Supabase lead persistence verified locally.
- Telegram lead notification verified locally.
- Basic lead anti-spam controls: honeypot, dwell-time check, field limits, and best-effort in-memory rate limiting.
- Production smoke checklist in `docs/12_PRODUCTION_SMOKE_CHECKLIST.md`.

Not implemented yet:

- Real LLM assistant.
- WhatsApp notifications.
- Resend email notifications.
- Admin dashboard or CRM workflow.
- Vercel deployment/project linking.
- Pricing flow.

Do not claim these integrations are complete until they are implemented and verified.

## Local Development

Local development continues for now. Vercel/deploy work is intentionally postponed until the MVP lead path is ready for a production smoke pass.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Checks

```bash
npm run eval:agent
npm run eval:leads
npm run lint
npm run build
```

## Environment

The static website does not require private environment variables. The live lead path requires server-only variables in `.env.local` when testing Supabase persistence and Telegram notification locally.

Set `NEXT_PUBLIC_SITE_URL` to the production origin before deployment if the final domain differs from `https://leonardotales.com`.

Never commit `.env*` files.

## Project OS Docs

Codex-readable project documentation lives in `docs/`.

Start with:

- `docs/00_PROJECT_BRIEF.md`
- `docs/03_MVP_SCOPE.md`
- `docs/05_TECHNICAL_ARCHITECTURE.md`
- `docs/11_DO_NOT_TOUCH.md`
- `docs/13_AGENT_CONTROL_PRINCIPLES.md`
