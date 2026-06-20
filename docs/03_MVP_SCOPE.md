# 03 MVP Scope

## MVP Definition

The MVP is a public website with a functional AI discovery assistant that classifies leads and collects contact information.

## Must Have

- Preserve existing terminal-like design.
- Turkish-first assistant flow.
- Short, professional assistant messages.
- Lead classification into four paths.
- Contact form opened at the right moment inside the chat panel.
- Basic validation for contact information.
- Storage plan for future Supabase lead table.
- Clear fallback for uncertain leads.

## Should Have

- Manual review-friendly lead payload.
- Telegram notification after lead capture.
- English route can remain, but Turkish is the priority.
- Basic abuse protection before accepting submissions.

## Not In MVP

- Full SaaS dashboard.
- User accounts.
- Subscription billing.
- Automated pricing.
- Multi-tenant agent builder.
- Complex CRM.
- Public claims that integrations work before verification.

## Lead Classification Paths

1. `customer_support_website` - AI Müşteri Temsilcisi + Website.
2. `sales_quote` - AI Satış ve Teklif Sistemi.
3. `operations_automation` - AI Operasyon Otomasyonu.
4. `unclear` - Henüz Netleşmedi.

## Minimum Lead Fields

- Name.
- Company or business name.
- Contact channel.
- Phone or email.
- Business description.
- Need summary.
- Classified path.
- Consent/permission note if needed.

## Acceptance Criteria

- Visitor can complete a discovery conversation without leaving the page.
- The system produces a lead classification.
- The contact form appears only after enough context is gathered.
- No pricing is quoted.
- No unverified integrations are presented as live.

## Sprint 1 Implementation Status

Implemented locally:

- Deterministic client-side discovery flow.
- Turkish-first assistant prompts.
- One-question-at-a-time conversation.
- Local classification into the four MVP paths.
- In-chat contact form.
- Client-side required field and email validation.
- Lead draft stored in React component state only.

Still not implemented:

- Backend persistence.
- Supabase insert.
- Telegram or WhatsApp notification.
- LLM-powered assistant behavior.
