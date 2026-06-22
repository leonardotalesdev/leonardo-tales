# 02 Business Model

## Commercial Model

The initial model should be project-led and consultative.

The assistant should not quote prices. Pricing will be determined manually after project analysis.

## Lead Qualification

The site should qualify visitors by understanding:

- Business type.
- Current website or sales channel.
- Customer support volume.
- Sales/quote workflow.
- Repetitive operational tasks.
- Urgency.
- Preferred contact channel.

## Lead Paths

1. AI Müşteri Temsilcisi + Website.
2. AI Satış ve Teklif Sistemi.
3. AI Operasyon Otomasyonu.
4. Henüz Netleşmedi.

## Recommended Funnel

1. Visitor enters site.
2. Assistant greets and asks one focused discovery question.
3. Visitor describes business.
4. Assistant asks short follow-up questions.
5. Assistant classifies the likely product path.
6. Assistant opens contact form inside the chat panel.
7. Lead is stored.
8. Notification is sent to the team.
9. Manual analysis and pricing happen outside the assistant flow.

## Current Lead Infrastructure

Verified locally:

- Supabase lead persistence through the server-side lead API.
- Telegram lead notification after successful lead handling.
- Basic spam, honeypot, dwell-time, field limit, and rate-limit protection.

Not part of the current verified business workflow:

- OpenAI/LLM assistant.
- WhatsApp notification.
- Resend email notification.
- CRM automation.
- Automated pricing.
- Vercel/deploy production workflow.

## Future Systems

Planned later, not MVP scope:

- WhatsApp notifications as a later option.
- Admin view or lightweight lead review flow.
- CRM handoff or pipeline view.
- Agent Control Layer for permission management, audit logs, approvals, telemetry, rollback, and kill-switches.

## Constraint

Do not build a large platform before the lead discovery and storage path is stable.

Future agent products should be priced and scoped around controlled business outcomes, not around agent count or autonomy level alone.
