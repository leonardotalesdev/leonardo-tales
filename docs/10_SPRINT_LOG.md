# 10 Sprint Log

## 2026-06-20 - Project OS Documentation Sprint

Scope:

- Inspect repository structure.
- Identify tech stack, app structure, routes, UI components, chat implementation, and deployment readiness.
- Preserve visual direction.
- Create Codex-readable project documentation.

Findings:

- The app uses Next.js 16 App Router under `src/app`.
- Main reusable components live in `src/components`.
- The homepage and manifesto exist in Turkish and English.
- The chat is a client-side prototype with fixed responses.
- No verified backend, LLM, Supabase, Telegram, WhatsApp, or Resend integration exists.
- Current prototype does not require private environment variables.
- `.env*` files are ignored.

Files created or updated in this sprint:

- `AGENTS.md`
- `CLAUDE.md`
- `README.md`
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

Checks:

- `npm run lint` passed.
- `npm run build` passed.

Next safest sprint:

Build a deterministic, no-external-service discovery assistant flow inside the existing `CoreAiChat` UI.

## 2026-06-20 - Sprint 1 Discovery Assistant

Scope:

- Convert `CoreAiChat` from fixed response prototype into a deterministic local discovery flow.
- Preserve the terminal-like Leonardo Tales AI OS visual language.
- Add in-chat contact form without external services.
- Keep lead data in component state only.

Implemented:

- Added `DiscoveryCategory`, `DiscoveryStep`, `DiscoveryMessage`, `LeadDraft`, and `ContactPreference` types.
- Added a step-based flow: business description, friction question, classification, contact prompt, contact form, completion.
- Added local keyword-based classification into the four MVP paths.
- Added an in-chat contact form with required field and email validation.
- Stored submitted lead drafts in React component state.
- Added compact terminal-style form CSS.

Still not connected:

- LLM assistant.
- Supabase persistence.
- Telegram or WhatsApp notifications.
- Backend lead submission route.
- Email/Resend.

Checks:

- `npm run lint` passed.
- `npm run build` passed.
- No automated test script exists in `package.json`.

Next safest sprint:

Connect the validated lead draft to a small server-side lead submission boundary, then add Supabase persistence and Telegram notification behind verified environment variables.

## 2026-06-20 - Sprint 1.1 Discovery Assistant UX + Copy Calibration

Scope:

- Refine assistant copy and chat behavior.
- Improve the initial Turkish greeting.
- Replace cold technical wording in user-facing prompts.
- Add deterministic no-price-quote response.
- Improve form UX after successful local submit.
- Preserve existing terminal-like visual language.

Implemented:

- Opened the chat with a polished discovery-agent greeting instead of technical boot logs.
- Replaced user-facing "sürtünme" copy with "sizi en çok zorlayan süreç" language.
- Added pricing-intent detection and a no-price-quote policy response.
- Kept the form closed until the visitor confirms with intent like "evet", "tamam", "formu aç", or "iletişim".
- Hid the contact form after successful local submission.
- Reset the visible form draft while keeping the submitted lead in local state.
- Updated left panel status values: `MODE: LOCAL`, `PATH: WAITING/category`, `LEAD: LOCAL/DRAFT/READY`.
- Darkened the chat message area slightly for readability without changing brand colors.

Still not connected:

- LLM assistant.
- Supabase persistence.
- Telegram or WhatsApp notifications.
- Backend/API route.
- Email/Resend.

Checks:

- `npm run lint` passed.
- `npm run build` passed.
- No automated test script exists in `package.json`.

Next safest sprint:

Commit Sprint 1 + Sprint 1.1 together, then add a small server-side lead submission boundary before connecting Supabase and Telegram.

## 2026-06-20 - Sprint 1.2 Short Business-Aware Lead Capture Flow

Scope:

- Improve deterministic classification.
- Shorten the conversation so clear leads are not over-questioned.
- Make the assistant act more like a warm AI customer representative.
- Ask at most one clarifying question for unclear leads.
- Avoid pushing the form for casual/no-intent visitors.
- Refine form timing.
- Keep pricing response clear and authority-bounded.
- Preserve terminal-like visual language.

Implemented:

- Added weighted classifier boosts for combinations like web sitesi + AI asistan, web sitesi + müşteri karşılama, emlak ofisi + web/customer assistant, chatbot, WhatsApp customer reception.
- Updated path status codes to `WAITING`, `SUPPORT_WEB`, `SALES_PROPOSAL`, `OPERATIONS`, and `UNCLEAR`.
- Added customer-services-system and customer-representative boosts for support/web classification.
- Replaced longer discovery summaries with short business-aware user-facing confirmations.
- Added business-specific explanation for beauty centers and real estate offices.
- Added casual/no-intent handling for messages like "Canım sıkıldı", "Öylesine yazdım", or "Sadece bakıyorum".
- Changed unclear handling to one clarifying question, then contact-form offer if the need remains unclear.
- Kept form opening gated behind user confirmation or explicit contact intent.
- Preserved local-only lead draft behavior.

Still not connected:

- LLM assistant.
- Supabase persistence.
- Telegram or WhatsApp notifications.
- Backend/API route.
- Email/Resend.

Checks:

- `npm run lint` passed.
- `npm run build` passed.
- No automated test script exists in `package.json`.

Next safest sprint:

Commit Sprint 1 + Sprint 1.1 + Sprint 1.2 together, then add a small server-side lead submission boundary before Supabase and Telegram integration.

## 2026-06-21 - Sprint 1.4 Agent Conversation Eval Sprint

Scope:

- Add deterministic local conversation evals for the Leonardo Tales customer representative agent.
- Cover greeting, casual/no-intent, clear website + AI customer representative, beauty center, sales/proposal, operations/workflow, pricing, human contact, unclear AI interest, and valid form submission scenarios.
- Keep the assistant short, Turkish-first, business-aware, and local-only.
- Do not add LLM, Supabase, Telegram, WhatsApp, backend routes, or a heavy test framework.

Implemented:

- Added `src/lib/agent/evals.ts` as a lightweight local eval runner.
- Added `npm run eval:agent`.
- Added deterministic quality rules: concise Turkish response, no price numbers, no fake integration claims, no internal category codes, no early form opening for greeting/casual messages, form offer for clear intent, and immediate form handoff for human-contact intent.
- Improved simple greeting handling so "Merhaba" asks for business/project/need instead of jumping directly to category discovery.
- Fixed Turkish locale normalization for uppercase `AI`, which could become `aı` and miss AI-interest intent checks.
- Updated the customer representative agent protocol and agent system docs.

Weak behaviors found:

- Simple greeting was too quickly routed toward category discovery.
- Uppercase `AI` inside Turkish locale normalization could miss the technical-guidance branch.

Checks:

- `npm run eval:agent` passed 10/10 scenarios.
- `npm run lint` passed.
- `npm run build` passed.

Next safest sprint:

Add a small server-side lead submission boundary with validation before connecting Supabase or Telegram.

## 2026-06-21 - Sprint 2 Server-side Lead Submission Boundary

Scope:

- Create a safe server-side API boundary for lead form submission.
- Add shared lead types and validation helpers.
- Prepare Supabase persistence without exposing service keys to the browser.
- Prepare Telegram notification without claiming it works before verification.
- Keep deterministic assistant behavior and premium chat UI intact.

Implemented:

- Added `POST /api/leads` Route Handler.
- Added `src/lib/leads/types.ts` and `src/lib/leads/validation.ts`.
- Added `src/lib/leads/supabase.ts` using server-side REST insert preparation.
- Added `src/lib/notifications/telegram.ts` using server-side Telegram API preparation.
- Added `supabase/migrations/001_create_leads.sql` with a `public.leads` table, constraints, indexes, RLS enabled, and a service-role policy.
- Added `.env.example` with placeholders only.
- Updated `CoreAiChat` so valid form submissions go through `/api/leads`.
- Added submit loading behavior and kept the form open on API failure.

Runtime behavior:

- `LEADS_STORAGE_MODE=local` returns local-only success for development and does not claim Supabase persistence.
- Supabase mode requires `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`; missing env vars return setup-aware failure.
- Telegram notification runs only server-side and reports `not_configured` when env vars are missing.
- Telegram success is not required for lead storage success.

Still not verified:

- Live Supabase insert against the created project.
- Applied migration in the remote Supabase database.
- Supabase Data API exposure for the `leads` table.
- Live Telegram bot/chat delivery.

Checks:

- `npm run eval:agent` passed 10/10 scenarios.
- `npm run lint` passed.
- `npm run build` passed.

Next safest sprint:

Apply the Supabase migration to the real project, set production env vars, and run one end-to-end lead submission smoke test before enabling Telegram notifications.
