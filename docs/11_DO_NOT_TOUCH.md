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

Do not claim these are working unless implemented and verified:

- Supabase.
- Telegram.
- WhatsApp.
- Vercel deployment/project linking.
- Resend.
- OpenAI or any other LLM provider.

## Secrets

Do not:

- Commit `.env*` files.
- Print secrets in logs.
- Put API keys in client components.
- Initialize private service clients at module scope in files that may be evaluated during build.

## Assistant Behavior

Do not:

- Make the assistant verbose.
- Ask many questions at once.
- Use a playful consumer-chat voice.
- Make medical, legal, or financial claims.
- Collect sensitive information that is not needed for lead qualification.

## Safe Change Rule

When unsure, choose the smallest reversible change that preserves the current UI and moves the MVP lead discovery flow forward.
