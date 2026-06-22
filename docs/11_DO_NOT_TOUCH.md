# 11 Do Not Touch

## Visual Direction

Do not redesign the site in normal MVP implementation sprints.

Preserve:

- Dark grid background.
- Amber/gold and green system colors.
- Terminal boot logs.
- Command-line interface feel.
- Minimal premium AI OS mood.
- Text-based Leonardo Tales wordmark.

## Product Constraints

Do not:

- Quote prices in the assistant flow.
- Build a large platform before the MVP lead path works.
- Add unnecessary complexity.
- Introduce user accounts or billing before lead capture is validated.
- Present planned integrations as completed.

## Integration Claims

Verified locally for the current lead path:

- Supabase live persistence.
- Telegram live notifications.

Do not claim these are working unless implemented and verified:

- WhatsApp.
- Vercel deployment/project linking.
- Resend.
- OpenAI or any other LLM provider.
- CRM/admin workflow.
- Agent Control Layer runtime.

Sprint 2 added a server-side lead API boundary plus Supabase and Telegram integration code. Supabase persistence and Telegram notification have been verified locally through `POST /api/leads`, but production deployment is not yet claimed.

## Secrets

Do not:

- Commit `.env*` files.
- Print secrets in logs.
- Put API keys in client components.
- Initialize private service clients at module scope in files that may be evaluated during build.
- Prefix private Supabase, Telegram, OpenAI, or Resend secrets with `NEXT_PUBLIC_`.
- Print full lead payloads, contact details, or anti-spam internals in logs.

## Anti-spam Boundary

Do not:

- Remove the hidden `website_url` honeypot without replacing it with another verified anti-spam control.
- Remove the `form_started_at` dwell-time check before public traffic.
- Treat the in-memory rate limiter as strong production protection.
- Add CAPTCHA, external bot services, or platform-scale infrastructure unless abuse patterns justify it.

## Assistant Behavior

Do not:

- Make the assistant verbose.
- Ask many questions at once.
- Use a playful consumer-chat voice.
- Make medical, legal, or financial claims.
- Collect sensitive information that is not needed for lead qualification.

## Agent Control Boundaries

Do not:

- Build complex autonomous agents before a clear business workflow exists.
- Connect agents to sensitive systems without permission controls.
- Allow agents to create financial, legal, code, CRM, payment, or irreversible operational changes without approval.
- Treat more agents as automatically better.
- Hide uncertainty, failed actions, or unverified integrations.
- Add production autonomy before logs, telemetry, rollback planning, and a kill-switch model exist.
- Expand the MVP into an Agent Control Layer platform during discovery-assistant stabilization.

## Safe Change Rule

When unsure, choose the smallest reversible change that preserves the current UI and moves the MVP lead discovery flow forward.
