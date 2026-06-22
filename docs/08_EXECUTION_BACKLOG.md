# 08 Execution Backlog

## Sprint 0 - Project OS Documentation

Status: in progress during this documentation sprint.

- Create project OS docs.
- Document current architecture.
- Record visual constraints.
- Record MVP scope.
- Run lint/build checks.

## Sprint 1 - Discovery Assistant Prototype

Status: completed.

Goal: convert `CoreAiChat` from fixed response prototype into a deterministic discovery flow without external integrations.

Tasks:

- Define assistant state machine.
- Add Turkish-first questions.
- Add local classification rules.
- Add lead path result.
- Add in-chat contact form UI.
- Keep all data local/no persistence for this sprint.
- Add basic tests if practical.

Result:

- Implemented in `src/components/CoreAiChat.tsx`.
- Added minimal matching CSS in `src/app/globals.css`.
- No external service was added.
- No automated tests exist in the repo yet.

## Sprint 1.1 - Discovery Assistant UX + Copy Calibration

Status: completed.

Goal: refine chat behavior, copy, form UX, and readability before backend/API integration.

Tasks:

- Replace cold technical user-facing wording.
- Improve the initial assistant greeting.
- Add pricing-question handling without quoting prices.
- Ensure the form opens only after confirmation.
- Hide the form after valid local submission.
- Keep one active form at a time.
- Improve chat message readability without changing brand colors.
- Make left protocol panel status values intentional.

Result:

- Calibrated Turkish-first assistant copy.
- Replaced user-facing "sürtünme" wording with clearer "zorlayan süreç" language.
- Added deterministic price-intent response.
- Kept submitted leads in local component state only.
- Confirmed no external service, backend route, or API integration was added.

## Sprint 1.2 - Short Business-Aware Lead Capture Flow

Status: completed.

Goal: shorten the deterministic assistant flow while making it warmer and more business-aware.

Tasks:

- Strengthen classification for website + AI assistant/customer reception intents.
- Map sales/proposal language to `AI Satış ve Teklif Sistemi`.
- Map operations/task/workflow language to `AI Operasyon Otomasyonu`.
- Avoid detailed follow-up questions once the need is already clear.
- Ask only one simple clarifying question when the need is unclear.
- Respond lightly to casual/no-intent visitors without pushing the form.
- Add short business-specific explanation for clear business types.
- Offer the form after clear confirmation or continued interest.
- Keep pricing response authority-bounded and number-free.
- Keep confirmations short and user-facing.
- Keep left panel status values coherent.

Result:

- Added weighted deterministic scoring and phrase/combination boosts.
- Added short lead-capture confirmations instead of long discovery summaries.
- Added one-question unclear flow.
- Added business-aware explanation for examples such as beauty center and real estate office.
- Added casual/no-intent handling that asks what the visitor does.
- Preserved local-only form storage and existing terminal visual language.
- Confirmed no external integration was added.

## Sprint 1.3 - Premium Chat UI Polish

Status: completed.

Goal: improve the chat panel's premium feel without redesigning the site or adding integrations.

Result:

- Replaced bright scrollbar behavior with dark integrated scrollbars.
- Made the left protocol/status panel feel more active with restrained green glow and status depth.
- Added deterministic response pacing with a short local "Yanıt hazırlanıyor..." state.
- Preserved the terminal-like Leonardo Tales AI OS visual language.

## Sprint 1.4 - Agent Conversation Eval Sprint

Status: completed.

Goal: create a lightweight deterministic conversation evaluation system for the local customer representative agent.

Tasks:

- Add local eval scenarios for greeting, casual/no-intent, clear web + AI assistant need, beauty center, sales/proposal, operations, pricing, human contact, unclear AI interest, and form submission.
- Add quality rules for Turkish-first concise replies, no price quotes, no fake integration claims, no internal category codes, and correct form timing.
- Improve greeting behavior so "Merhaba" asks for business/project/need instead of jumping to category discovery.
- Normalize Turkish-locale `AI` casing so uppercase `AI` is recognized as `ai`.

Result:

- Added `src/lib/agent/evals.ts`.
- Added `npm run eval:agent`.
- Kept all behavior deterministic and local.
- No external service, backend route, or heavy test framework was added.

## Sprint 2 - Lead Capture Backend

Status: completed as server-side boundary and integration preparation.

Goal: store classified leads safely.

Tasks:

- Choose Server Action or Route Handler.
- Define lead payload schema.
- Add server-side validation.
- Add Supabase project and table only after credentials are available.
- Insert lead into Supabase.
- Do not commit `.env*`.
- Verify locally with real env vars.

Result:

- Chose `POST /api/leads` Route Handler.
- Added shared lead types and server-side validation.
- Added Supabase REST insert helper using server-only `SUPABASE_SERVICE_ROLE_KEY`.
- Added Telegram notification helper using server-only bot env vars.
- Added `supabase/migrations/001_create_leads.sql`.
- Added `.env.example` with placeholder env names only.
- Updated `CoreAiChat` to submit form data through the API route.
- Kept form open when API submission fails.
- No OpenAI, WhatsApp, Resend, dashboard, or admin panel was added.
- Live Supabase insert was verified after applying the migration and service-role grants.
- Telegram live notification was verified after configuring server-only bot env vars.

## Sprint 2.3 - Spam / Rate Limit / Production Smoke Checklist

Status: completed.

Goal: add basic protection to the public lead submission path before sending traffic to the form.

Tasks:

- Add hidden honeypot field to the client payload.
- Add client-created form start timestamp.
- Reject honeypot-filled and unrealistically fast submissions server-side.
- Normalize, trim, and cap lead field lengths server-side.
- Add a best-effort IP rate limiter without external infrastructure.
- Keep Supabase persistence as the source of truth.
- Keep Telegram notification non-blocking after successful storage.
- Add deterministic lead anti-spam evals.
- Add a production smoke-test checklist.

Result:

- Added `website_url` honeypot and `form_started_at` anti-spam fields.
- Added server-side spam classification before Supabase persistence.
- Added process-local limiter: 5 lead submissions per IP per 10 minutes.
- Added `npm run eval:leads`.
- Added `docs/12_PRODUCTION_SMOKE_CHECKLIST.md`.
- Documented that the in-memory limiter is not reliable as strong serverless/multi-instance production protection.

## Sprint 3 - Lead Notifications

Status: completed for Telegram.

Goal: notify team after lead capture.

Tasks:

- Add Telegram bot notification first.
- Keep WhatsApp as later option.
- Include lead summary, classification, and contact details.
- Add failure handling that does not lose the lead.

## Sprint 3.0 - Agent Control Principles & Architecture Alignment

Status: completed as documentation and architecture alignment.

Goal: define how Leonardo Tales designs, limits, monitors, and controls AI agents before adding more autonomy.

Tasks:

- Create `docs/13_AGENT_CONTROL_PRINCIPLES.md`.
- Define the Agent Control Layer as a future product category, not MVP scope.
- Separate MVP controls from future architecture, production, research, and vision layers.
- Align project docs with the verified local lead-capture state.
- Keep runtime code, UI, OpenAI/LLM, and deploy unchanged.

Result:

- Added the Agent Control Principles reference.
- Clarified that agents should be bounded operational components with permission boundaries, telemetry, human approval, audit logs, sandboxing, rollback, kill-switches, and measurable business outcomes.
- Kept the current MVP scope unchanged.
- Added Agent Control Layer to future backlog language only.
- Reconfirmed that local development continues and Vercel/deploy is postponed.

## Sprint 3.2 - Local Telegram Recheck + Manual Browser QA

Status: completed for local Telegram verification; browser QA confirmation remains manual/pending.

Goal: re-check the local Telegram notification path and guide a small manual browser QA pass before future deploy work.

Result:

- Local eval, lead anti-spam eval, lint, and build checks passed.
- Safe synthetic lead submission returned HTTP 200 and `persistence: "stored"`.
- Initial active local API response returned `notification: "skipped"` because local notification mode was still `LEADS_NOTIFICATION_MODE=none`.
- After local mode was corrected to `LEADS_STORAGE_MODE=supabase` and `LEADS_NOTIFICATION_MODE=telegram`, follow-up developer-confirmed recheck returned `persistence: "stored"` and `notification: "sent"`.
- Developer confirmed the Telegram message was received.
- Manual browser QA steps were provided, but independent browser automation was unavailable and Playwright/Chrome were not installed.

Next:

- Complete manual browser QA before resuming Vercel/deploy work.
- Consider adding a lightweight browser QA path before resuming Vercel/deploy work.

## Sprint 4 - Production Readiness

Status: postponed until local MVP checks and production smoke planning are deliberately resumed.

Goal: prepare the MVP for public traffic.

Tasks:

- Run full build.
- Add 404/error states if missing.
- Review metadata and OG assets.
- Complete production smoke checklist when Vercel/deploy work resumes.
- Verify deployment environment only after deployment is deliberately resumed.
- Smoke test all routes locally before any deploy work.

## Future Backlog - Agent Control Layer

Status: future / not MVP.

Potential components:

- Permission management.
- Audit logs.
- Risk scoring.
- Human approval workflows.
- Task boundaries.
- Sandbox execution.
- Rollback.
- Kill-switch.
- Telemetry.
- Policy engine.
- Tool access control.

Rule: do not build this as a platform feature until the current discovery assistant and lead capture path have clear business demand, production evidence, and measured outcomes.

## Backlog Rules

- Keep each sprint small and shippable.
- Do not build an admin platform before leads are being captured.
- Do not add pricing automation in the assistant.
- Preserve existing visual direction.
- Do not build complex autonomous agents before clear business workflow and control boundaries exist.
