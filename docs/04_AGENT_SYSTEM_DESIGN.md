# 04 Agent System Design

## Current Assistant State

`src/components/CoreAiChat.tsx` is now a deterministic client-side discovery assistant.

It currently:

- Opens with a clear Turkish-first discovery greeting.
- Handles simple greetings with a short business/project/need prompt instead of jumping into category discovery.
- Understands the visitor's need without turning the chat into a long consulting session.
- Responds lightly to casual/no-intent visitors and asks what they do instead of pushing the form.
- Briefly explains how Leonardo Tales can help the visitor's business type when enough context exists.
- Classifies the need into one of four paths with deterministic keyword and intent scoring.
- Recognizes clear first-message intents such as web sitesi + AI asistan as `AI Müşteri Temsilcisi + Website`.
- Normalizes Turkish-locale `AI` casing so uppercase `AI` does not become a missed `aı` intent.
- Asks at most one clarifying question when the need is unclear.
- Confirms the understood need in simple Turkish.
- Offers to open an in-chat contact form after the confirmation.
- Answers pricing questions without quoting a price.
- Validates required contact fields on the client.
- Submits lead data to `POST /api/leads`.
- Keeps the form open if the server submission fails.
- Hides the form after successful submission.

It does not:

- Does not call an LLM.
- Does not quote prices.
- Does not send WhatsApp or email notifications.
- Does not create CRM records.
- Does not automate follow-up beyond lead storage and Telegram notification.

## Intended Assistant Behavior

The assistant should begin serious and professional, then become warm like a guide. It can feel conscious and visionary, but it must stay short, direct, and useful.

Sprint 3.4 should refine this further: the opening should feel more distinctive to Leonardo Tales, intelligent, warm, slightly witty, and professional. It should invite the visitor to write naturally, then guide them toward:

"İşinizi, projenizi veya kurmak istediğiniz yapay zekâ sistemini kısaca anlatın; size doğru başlangıç noktasını netleştireyim."

The assistant must not claim consciousness, sound arrogant, sound mystical, or fall into generic chatbot tone.

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
- Refuse clearly harmful or illegal intent instead of classifying it as a lead.
- Frame oversized ambitions as realistic MVP discovery/prototype work instead of overpromising.

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

## Safety Refusal

Sprint 3.4 must add deterministic refusal behavior for clearly harmful or illegal intent.

The assistant must not help with:

- Hacking or unauthorized access.
- Cyber abuse.
- Credential theft.
- Evasion.
- Malware.
- Illegal activity.

For clearly harmful intent, the assistant must not open the lead form.

Expected Turkish refusal:

"Bu tür yetkisiz veya zararlı işlemlere yardımcı olamam. Leonardo Tales yalnızca yasal, güvenli ve işletme odaklı yapay zekâ sistemleri kurar. İsterseniz siber güvenlik farkındalığı, güvenli otomasyon veya yasal iş süreçleri için yardımcı olabilirim."

## Oversized Product Requests

Sprint 3.4 must add realistic scope handling for oversized product requests.

Example user request:

"Google’a rakip olacak yapay zekâ destekli arama motoru kurmak istiyorum."

Expected behavior:

- Acknowledge the vision.
- Set realistic scope.
- Offer MVP framing.
- Offer the form only as a strategic discovery call, not as if a full Google competitor can be built immediately.

Expected Turkish direction:

"Bu büyük ölçekli bir ürün vizyonu. İlk adım olarak belirli bir alan için küçük bir arama/keşif prototipi, bilgi tabanı veya niş arama asistanı tasarlanabilir."

## Form Refinement Notes

Sprint 3.4 must refine the lead form without expanding scope:

- Website remains optional.
- Empty website is accepted.
- Common `www.example.com` style input should normalize to `https://www.example.com` client-side or server-side.
- Browser-native optional-field blocking such as "Lütfen bir URL girin" should be avoided for optional website.
- Website placeholder should become clearer, for example `https://ornek.com` or `Web siteniz varsa`.
- Preferred contact label should become clearer, for example `Size hangi kanaldan ulaşalım?`.
- Add a neutral contact option such as `Fark etmez` or `Kararsızım`, keeping the field optional if practical.

## Response Pacing

Sprint 3.4 should adjust the deterministic local thinking state:

- Keep a visible state such as `Yanıt hazırlanıyor...`.
- Use a natural local delay around 1.2-2 seconds.
- Do not add external APIs.
- Keep the behavior deterministic and non-flaky.

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
- `POST /api/leads` route for lead submission.
- Shared lead payload validator.
- Supabase insert.
- Telegram notification.
- Manual follow-up.
- Future Tool Permission Layer before connecting agents to sensitive systems.
- Future Human Approval Layer for pricing, proposal, CRM, code, payment, or legal actions.
- Future Audit & Telemetry Layer before scaling autonomous workflows.

## Guardrails

- Do not quote prices.
- Do not claim a system is connected until it is.
- Do not ask for sensitive secrets.
- Do not present the assistant as a general-purpose medical, legal, or financial advisor.
- Do not give agents hidden authority over irreversible business actions.
- Keep agent capability bounded by explicit workflow, permission, and human handoff rules.

## Agent Control Alignment

Sprint 3.0 adds `docs/13_AGENT_CONTROL_PRINCIPLES.md` as the long-term reference for designing, limiting, monitoring, and controlling Leonardo Tales agents.

Core alignment:

- Agents are bounded operational components, not fully trusted autonomous actors.
- The MVP uses deterministic behavior instead of uncontrolled LLM autonomy.
- Lead capture has validation, persistence, notification, spam checks, and human follow-up.
- Future sales, proposal, CRM, operations, code, payment, or legal actions require approval gates and auditability.

## Local Conversation Evals

Sprint 1.4 adds a lightweight deterministic eval script:

```bash
npm run eval:agent
```

The eval runs locally without OpenAI, Supabase, backend routes, Telegram, WhatsApp, or test-framework dependencies. It checks 10 key scenarios: greeting, casual/no-intent, website + AI customer representative, beauty center, sales/proposal, operations/workflow, pricing guardrail, direct human contact, unclear AI interest, and valid form submission.

Quality rules include Turkish-first concise replies, no price numbers, no fake integration claims, no internal category codes in user-facing responses, no early form opening for greeting/casual messages, form offer for clear business intent, and form opening for direct human contact intent.
