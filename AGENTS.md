<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Leonardo Tales Agent Rules

Repository: `leonardotalesdev/leonardo-tales`

Positioning: **Leonardo Tales — Yapay Zekâ Ajan İşletim Sistemi**

## Product Direction

- Initial market: Türkiye.
- Initial language: Turkish.
- Domain target: `leonardotales.com`.
- First product: AI Müşteri Temsilcisi + Website.
- Second product: AI Satış ve Teklif Sistemi.
- Third product: AI Operasyon Otomasyonu.
- MVP objective: greet visitors with an AI discovery assistant, understand the business need, classify the lead, then collect contact information at the right moment.

## Visual Direction To Preserve

Do not redesign the site unless explicitly requested.

Preserve the current premium, minimal, terminal-like AI operating system language:

- Dark grid background.
- Amber/gold and green system colors.
- Text-based Leonardo Tales wordmark.
- Agent boot logs and command-line interface feel.
- OpenClaw/Codex-inspired system console mood.
- Dense, serious, high-signal layouts.

Avoid large visual pivots, decorative landing-page tropes, or replacing the current interface language with a generic SaaS template.

## Current Implementation Reality

- This is a Next.js App Router project using `src/app`.
- The visible chat in `src/components/CoreAiChat.tsx` is a deterministic customer representative assistant, not an LLM agent.
- `POST /api/leads` is the server-side lead submission boundary.
- Supabase live persistence has been verified locally.
- Telegram live notification has been verified locally.
- Basic honeypot, dwell-time, field limit, and best-effort in-memory rate-limit protection exists for the lead path.
- There is no verified OpenAI/LLM, WhatsApp, Vercel deployment/project linking, Resend, CRM, or admin workflow integration yet.
- Local development continues for now; Vercel/deploy is intentionally postponed.
- Do not claim integrations are working unless they are implemented and verified.
- Do not quote prices in the assistant flow. Pricing is manual after project analysis.
- Treat future Agent Control Layer work as architecture/backlog direction, not current MVP runtime scope.

## Engineering Constraints

- Keep changes small, verifiable, and MVP-focused.
- Do not add platform-scale complexity before the discovery assistant and lead capture path are stable.
- Do not touch secrets or commit `.env` files.
- Use `npm` because the repo has `package-lock.json`.
- Run `npm run lint` and preferably `npm run build` after meaningful changes.
- Favor docs and explicit decision logs when product direction changes.

## Documentation Map

Project OS docs live in `docs/`:

- `docs/00_PROJECT_BRIEF.md`
- `docs/01_BRAND_AND_POSITIONING.md`
- `docs/02_BUSINESS_MODEL.md`
- `docs/03_MVP_SCOPE.md`
- `docs/04_AGENT_SYSTEM_DESIGN.md`
- `docs/05_TECHNICAL_ARCHITECTURE.md`
- `docs/06_UI_DESIGN_SYSTEM.md`
- `docs/07_CONTENT_AND_TONE_GUIDE.md`
- `docs/08_EXECUTION_BACKLOG.md`
- `docs/09_DECISION_LOG.md`
- `docs/10_SPRINT_LOG.md`
- `docs/11_DO_NOT_TOUCH.md`
- `docs/12_PRODUCTION_SMOKE_CHECKLIST.md`
- `docs/13_AGENT_CONTROL_PRINCIPLES.md`
