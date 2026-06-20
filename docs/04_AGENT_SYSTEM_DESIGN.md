# 04 Agent System Design

## Current Assistant State

`src/components/CoreAiChat.tsx` is a client-side prototype.

It currently:

- Shows initial AI log messages.
- Accepts user text.
- Appends the user message locally.
- Appends a fixed agent response.
- Does not call an LLM.
- Does not classify the lead.
- Does not store lead data.

## Intended Assistant Behavior

The assistant should begin serious and professional, then become warm like a guide. It can feel conscious and visionary, but it must stay short, direct, and useful.

## Conversation Principles

- Ask one question at a time.
- Keep messages short.
- Avoid pricing.
- Avoid overpromising.
- Classify based on business need, not user jargon.
- If uncertain, use `Henüz Netleşmedi`.
- Open a contact form only after enough context is collected.

## Discovery Flow

1. Greeting:
   - "İşinizi ve şu an çözmek istediğiniz ihtiyacı kısaca anlatın."
2. Business understanding:
   - Ask what the company does.
3. Problem detection:
   - Ask whether the main pain is support, sales/quotes, or internal operations.
4. Classification:
   - Map to one of four lead paths.
5. Contact handoff:
   - Explain that a short project analysis is needed.
   - Open contact form inside the chat panel.

## Classification Hints

AI Müşteri Temsilcisi + Website:

- Frequent customer questions.
- Website needed or outdated.
- Need online inquiry handling.
- Need product/service explanation automation.

AI Satış ve Teklif Sistemi:

- Manual proposals.
- Quote preparation.
- Sales follow-up.
- Repetitive pricing or package explanation.

AI Operasyon Otomasyonu:

- Internal manual workflows.
- Data entry.
- Reporting.
- Task routing.
- Process monitoring.

Henüz Netleşmedi:

- Visitor is exploring.
- Need is too broad.
- Not enough context.

## Future Architecture Sketch

- Client chat UI.
- Server route or Server Action for conversation step.
- Lightweight classifier.
- Lead payload validator.
- Supabase insert.
- Telegram notification.
- Manual follow-up.

## Guardrails

- Do not quote prices.
- Do not claim a system is connected until it is.
- Do not ask for sensitive secrets.
- Do not present the assistant as a general-purpose medical, legal, or financial advisor.
