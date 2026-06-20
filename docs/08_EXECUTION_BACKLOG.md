# 08 Execution Backlog

## Sprint 0 - Project OS Documentation

Status: in progress during this documentation sprint.

- Create project OS docs.
- Document current architecture.
- Record visual constraints.
- Record MVP scope.
- Run lint/build checks.

## Sprint 1 - Discovery Assistant Prototype

Goal: convert `CoreAiChat` from fixed response prototype into a deterministic discovery flow without external integrations.

Tasks:

- Define assistant state machine.
- Add Turkish-first questions.
- Add local classification rules.
- Add lead path result.
- Add in-chat contact form UI.
- Keep all data local/no persistence for this sprint.
- Add basic tests if practical.

## Sprint 2 - Lead Capture Backend

Goal: store classified leads safely.

Tasks:

- Choose Server Action or Route Handler.
- Define lead payload schema.
- Add server-side validation.
- Add Supabase project and table only after credentials are available.
- Insert lead into Supabase.
- Do not commit `.env*`.
- Verify locally with real env vars.

## Sprint 3 - Lead Notifications

Goal: notify team after lead capture.

Tasks:

- Add Telegram bot notification first.
- Keep WhatsApp as later option.
- Include lead summary, classification, and contact details.
- Add failure handling that does not lose the lead.

## Sprint 4 - Production Readiness

Goal: prepare the MVP for public traffic.

Tasks:

- Run full build.
- Add 404/error states if missing.
- Review metadata and OG assets.
- Add rate limiting or spam protection if public form is live.
- Verify deployment environment.
- Smoke test all routes.

## Backlog Rules

- Keep each sprint small and shippable.
- Do not build an admin platform before leads are being captured.
- Do not add pricing automation in the assistant.
- Preserve existing visual direction.
