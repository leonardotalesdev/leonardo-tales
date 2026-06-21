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

Verified later:

- Live Telegram bot/chat delivery was verified in Sprint 2.2.

Checks:

- `npm run eval:agent` passed 10/10 scenarios.
- `npm run lint` passed.
- `npm run build` passed.

Next safest sprint:

Run a complete UI-to-Supabase-to-Telegram smoke test before public launch and then add anti-spam controls.

## 2026-06-21 - Sprint 2.1 Supabase + Telegram Live Verification

Scope:

- Verify the real Supabase persistence and Telegram notification path locally.
- Keep the verification secret-safe.
- Do not add product features or UI redesigns.

Inspection:

- `POST /api/leads` exists and returns setup-aware JSON.
- `.env.local` remains ignored.
- `.env.example` is allowed through `.gitignore`.
- Supabase migration exists at `supabase/migrations/001_create_leads.sql`.

Current environment status:

- `SUPABASE_URL`: set.
- `SUPABASE_SERVICE_ROLE_KEY`: set.
- `TELEGRAM_BOT_TOKEN`: missing.
- `TELEGRAM_CHAT_ID`: missing.
- `LEADS_STORAGE_MODE`: set.
- `LEADS_NOTIFICATION_MODE`: set.

Verification result:

- Supabase migration was applied manually in Supabase SQL Editor.
- `public.leads` is visible in Supabase Table Editor.
- Live Supabase insert was tested through `POST /api/leads`.
- Initial Supabase REST insert returned HTTP 403 / PostgREST `42501` permission denied for `public.leads`.
- Manual SQL grants were applied in Supabase SQL Editor:
  - `grant usage on schema public to service_role;`
  - `grant select, insert, update, delete on table public.leads to service_role;`
- After the service-role grants, direct Supabase REST insert returned HTTP 201.
- `POST /api/leads` returned `ok: true`.
- API response included `persistence: "stored"`.
- API response included `notification: "skipped"`, which is correct because Telegram is not configured yet.
- A test lead was created in `public.leads`.
- Live Telegram notification was not run.
- Local-only API path was smoke tested and returned `persistence: "local_only"` plus `notification: "skipped"`.
- No secret values were printed.
- Supabase helper was hardened so REST request exceptions return controlled storage failures instead of falling into the API route's generic unexpected-error branch.

Next action:

- Keep Supabase env vars in `.env.local` only.
- Delete or mark Sprint 2.1 test leads in Supabase if they should not remain in production data.
- Configure Telegram only when ready, then verify `notification: "sent"` with a separate smoke test.

## 2026-06-21 - Sprint 2.2 Telegram Lead Notification Verification

Scope:

- Verify Telegram lead notification after successful Supabase persistence.
- Keep Supabase storage as the source of truth.
- Do not expose Telegram or Supabase secrets.
- Do not test or add OpenAI/LLM.

Verified:

- Supabase persistence remained `persistence: "stored"`.
- Telegram notification returned `notification: "sent"`.
- Telegram message was received.
- Telegram notification did not block Supabase persistence.
- No secret values were printed or committed.

Current integration status:

- Supabase lead persistence: verified.
- Telegram lead notification: verified.
- WhatsApp, Resend, OpenAI/LLM: not configured.

Next safest sprint:

Add basic spam/rate-limit protection and a production smoke-test checklist before sending public traffic to the form.

## 2026-06-21 - Sprint 2.3 Spam / Rate Limit / Production Smoke Checklist

Scope:

- Add minimal anti-spam protection to `POST /api/leads`.
- Keep the deterministic assistant and premium chat UI unchanged.
- Keep Supabase persistence and Telegram notification behavior intact.
- Do not add OpenAI/LLM or external rate-limit infrastructure.
- Add a production smoke checklist for the first public traffic pass.

Implemented:

- Added `website_url` honeypot and `form_started_at` fields to the chat form payload.
- Kept those anti-spam fields hidden/offscreen and out of the visible UI.
- Added server-side normalization and trimming for lead strings.
- Added server-side max length checks for name, email, phone, company/project, website, note, business type, detected need, and conversation summary.
- Rejected filled honeypot submissions before persistence.
- Rejected form submissions under 2 seconds before persistence.
- Added a process-local IP limiter at 5 lead submissions per IP per 10 minutes.
- Added safe Turkish `400` responses for invalid/spam submissions and `429` responses for rate-limited submissions.
- Hardened Telegram notification request failures so stored leads still return success with `notification: "failed"`.
- Added `npm run eval:leads` for deterministic validation/rate-limit checks.
- Added `docs/12_PRODUCTION_SMOKE_CHECKLIST.md`.

Known limitation:

- The in-memory rate limiter is best-effort only. It can reset on server restart and does not coordinate across serverless regions or multiple instances.

Checks:

- `npm run eval:agent` passed 10/10 scenarios.
- `npm run eval:leads` passed 6/6 scenarios.
- `npm run lint` passed.
- `npm run build` passed.

Next safest sprint:

Perform the production smoke checklist on the Vercel deployment URL before routing public traffic to `leonardotales.com`.
