# 04 Agent System Design

## Current Assistant State

`src/components/CoreAiChat.tsx` is now a deterministic client-side discovery assistant.

It currently:

- Opens with a clear Turkish-first discovery greeting.
- Understands the visitor's need without turning the chat into a long consulting session.
- Responds lightly to casual/no-intent visitors and asks what they do instead of pushing the form.
- Briefly explains how Leonardo Tales can help the visitor's business type when enough context exists.
- Classifies the need into one of four paths with deterministic keyword and intent scoring.
- Recognizes clear first-message intents such as web sitesi + AI asistan as `AI Müşteri Temsilcisi + Website`.
- Asks at most one clarifying question when the need is unclear.
- Confirms the understood need in simple Turkish.
- Offers to open an in-chat contact form after the confirmation.
- Answers pricing questions without quoting a price.
- Validates required contact fields on the client.
- Stores submitted lead data in local React component state.
- Hides the form after successful local submission.

It does not:

- Does not call an LLM.
- Does not call a backend.
- Does not insert data into Supabase.
- Does not send Telegram, WhatsApp, or email notifications.

## Intended Assistant Behavior

The assistant should begin serious and professional, then become warm like a guide. It can feel conscious and visionary, but it must stay short, direct, and useful.

## Conversation Principles

- Ask one question at a time.
- Keep messages short.
- Do not conduct a long consulting discovery session.
- Do not ask detailed business-flow questions once the need is already clear.
- Avoid pricing.
- Avoid overpromising.
- Classify based on business need, not user jargon.
- If uncertain, use `Henüz Netleşmedi`.
- Open a contact form only after enough context is collected.

## Discovery Flow

1. Greeting:
   - "Merhaba. Ben Leonardo Tales’in yapay zekâ müşteri temsilcisiyim. İşinizi, projenizi veya kurmak istediğiniz yapay zekâ sistemini kısaca anlatın; size doğru başlangıç noktasını netleştireyim."
2. Business understanding:
   - Understand the visitor's need from their first message.
3. Problem detection:
   - If unclear, ask one simple category question.
4. Classification:
   - Map to one of four lead paths.
5. Contact handoff:
   - Confirm the understood need in simple Turkish.
   - Position the system as a practical opportunity without exaggeration.
   - Open contact form inside the chat panel only after user confirmation.

If the first user message already contains a clear product intent, the assistant should classify, confirm, and offer the form without forcing an unnecessary extra question.

If the user is uncertain, the assistant should ask one simple clarifying question. If it remains unclear but the user is interested, offer the contact form for a short human follow-up.

If the user is casual or just browsing, the assistant should not push the form. It should briefly explain what Leonardo Tales usually builds and ask what the user does.

## Pricing Reply

If the visitor asks for price, the assistant must not quote a price.

Current Turkish policy:

"Benim fiyat verme yetkim bulunmuyor. Kapsam, kullanılacak araçlar ve ihtiyaç duyulan çalışma süresi analiz edildikten sonra size uygun plan ve teklif iletilir. İsterseniz kısa iletişim formunu açabilirim."

## Classification Hints

AI Müşteri Temsilcisi + Website:

- Frequent customer questions.
- Website needed or outdated.
- Need online inquiry handling.
- Need product/service explanation automation.
- Website + AI assistant.
- Website + customer greeting/triage.
- Real estate office + website/customer assistant.
- Chatbot or WhatsApp customer reception.
- Customer services system.
- Appointment assistant for businesses such as beauty centers.

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
- User says they do not know where to start and gives no clear business-flow signal yet.

## User-Facing Confirmation Examples

AI Müşteri Temsilcisi + Website:

"Sizi anlıyorum. İhtiyacınız, işletmeniz için profesyonel bir web sitesi ve bu site üzerinde müşterileri karşılayacak bir yapay zekâ müşteri temsilcisi sistemi gibi görünüyor. Bu doğruysa kısa iletişim formunu açabilirim."

Beauty center example:

"Güzellik merkezi için en doğru başlangıç genelde web sitesi + yapay zekâ müşteri karşılama/randevu asistanı olur. Bu sistem hizmetlerinizi anlatır, gelen soruları karşılar, randevu taleplerini toplar ve size düzenli müşteri talebi olarak iletir."

AI Satış ve Teklif Sistemi:

"Sizi anlıyorum. İhtiyacınız, satış ve teklif sürecinizi daha hızlı ve düzenli hale getirecek bir yapay zekâ sistemi gibi görünüyor. Bu doğruysa kısa iletişim formunu açabilirim."

AI Operasyon Otomasyonu:

"Sizi anlıyorum. İhtiyacınız, operasyon ve iş akışlarınızı daha düzenli takip edecek bir otomasyon sistemi gibi görünüyor. Bu doğruysa kısa iletişim formunu açabilirim."

Henüz Netleşmedi:

"Sizi anlıyorum. İhtiyaç henüz tam netleşmemiş olabilir. Bu durumda kısa bir ön görüşme daha doğru olur. Sistem yetkilisinin size ulaşabilmesi için iletişim formunu açabilirim."

## Future Architecture Sketch

- Existing client chat UI.
- Server route or Server Action for lead submission.
- Shared lead payload validator.
- Supabase insert.
- Telegram notification.
- Manual follow-up.

## Guardrails

- Do not quote prices.
- Do not claim a system is connected until it is.
- Do not ask for sensitive secrets.
- Do not present the assistant as a general-purpose medical, legal, or financial advisor.
