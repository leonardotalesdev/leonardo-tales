"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type DiscoveryCategory =
  | "customer_support_website"
  | "sales_quote"
  | "operations_automation"
  | "unclear";

type DiscoveryStep =
  | "business"
  | "friction"
  | "contact_prompt"
  | "contact_form"
  | "completed";

type ContactPreference = "telegram" | "whatsapp" | "email" | "phone";

type DiscoveryMessage = {
  id: number;
  role: "agent" | "user";
  content: string;
  tone?: "gold" | "neon";
};

type LeadDraft = {
  name: string;
  email: string;
  phone: string;
  company_or_project: string;
  website: string;
  preferred_contact_channel: ContactPreference;
  note: string;
};

type SubmittedLead = LeadDraft & {
  category: DiscoveryCategory;
  businessSummary: string;
  frictionSummary: string;
  business_type: string;
  detected_need: string;
  source: "leonardo_tales_ai_representative";
  status: "new";
  conversation_summary: string;
  next_action: "human_follow_up_required";
  createdAt: string;
};

type Locale = "tr" | "en";

const categoryLabels: Record<DiscoveryCategory, string> = {
  customer_support_website: "AI Müşteri Temsilcisi + Website",
  sales_quote: "AI Satış ve Teklif Sistemi",
  operations_automation: "AI Operasyon Otomasyonu",
  unclear: "Henüz Netleşmedi",
};

const categoryCodes: Record<DiscoveryCategory, string> = {
  customer_support_website: "SUPPORT_WEB",
  sales_quote: "SALES_PROPOSAL",
  operations_automation: "OPERATIONS",
  unclear: "UNCLEAR",
};

const emptyLeadDraft: LeadDraft = {
  name: "",
  email: "",
  phone: "",
  company_or_project: "",
  website: "",
  preferred_contact_channel: "telegram",
  note: "",
};

const chatCopy = {
  tr: {
    label: "Çekirdek yapay zekâ keşif arayüzü",
    sidebarLabel: "Aktif ajan protokolleri",
    status: "[YEREL_MOD]",
    inputLabel: "Keşif asistanına cevap yaz",
    submit: "GÖNDER",
    processing: "Yanıt hazırlanıyor...",
    prompts: {
      business: "İşinizi veya ihtiyacınızı yazın...",
      friction: "İşinizi veya ihtiyacınızı yazın...",
      contact_prompt: "Formu açmamı ister misiniz?",
      contact_form: "Form açık. İsterseniz ek not yazabilirsiniz...",
      completed: "Yeni not veya ek bilgi yazabilirsiniz...",
    },
    messages: [
      {
        id: 1,
        role: "agent",
        content:
          "Merhaba. Ben Leonardo Tales’in yapay zekâ müşteri temsilcisiyim. İşinizi, projenizi veya kurmak istediğiniz yapay zekâ sistemini kısaca anlatın; size doğru başlangıç noktasını netleştireyim.",
      },
    ],
    frictionQuestion:
      "Size daha doğru yardımcı olabilmem için şunu netleştirelim: ihtiyacınız daha çok web sitesi ve müşteri karşılama, satış/teklif süreci veya operasyon/iş akışı tarafında mı?",
    unclearGuidance:
      "Bu normal. Henüz netleşmediyse önce en temel noktayı seçelim: web sitesi ve müşteri karşılama, satış/teklif süreci veya operasyon/iş akışı tarafında mı ilerleyelim?",
    casualReply:
      "Anladım, sorun değil. Leonardo Tales en çok işletmeler, ajanslar ve profesyonel hizmetler için yapay zekâ destekli web sitesi ve müşteri karşılama sistemleri kurar. Siz ne işle uğraşıyorsunuz?",
    greetingReply:
      "Merhaba. İşinizi, projenizi veya kurmak istediğiniz yapay zekâ sistemini kısaca yazın; sizi doğru başlangıç noktasına yönlendireyim.",
    unclearContactOffer:
      "Sizi anlıyorum. İhtiyaç henüz tam netleşmemiş olabilir. Bu durumda kısa bir ön görüşme daha doğru olur. Sistem yetkilisinin size ulaşabilmesi için iletişim formunu açabilirim.",
    technicalGuidance:
      "Bu aşamada teknik bilmeniz gerekmiyor. Önce en temel noktayı seçelim: web sitesi ve müşteri karşılama, satış/teklif süreci veya operasyon/iş akışı tarafında mı ilerleyelim?",
    contactQuestion:
      "İstersen kısa iletişim formunu açabilirim. Kapsam ve fiyat, ihtiyaç analizinden sonra netleşir.",
    openFormHint:
      "Tabii. Leonardo Tales yetkilisinin size ulaşabilmesi için kısa iletişim formunu doldurabilirsiniz.",
    formClosedHint: "Tamam. Hazır olduğunda 'formu aç' yazman yeterli.",
    formAlreadyOpen: "Form aşağıda açık. Gerekli alanları doldurabilirsin.",
    completedReply:
      "Notu aldım. İhtiyaçların proje analizine dönüştürülebilir.",
    success:
      "Bilgileriniz alındı. Leonardo Tales yetkilisi sizinle iletişime geçerek ihtiyacınızı netleştirecektir. Güzel bir başlangıç olabilir.",
    pricingReply:
      "Benim fiyat verme yetkim bulunmuyor. Kapsam, kullanılacak araçlar ve ihtiyaç duyulan çalışma süresi analiz edildikten sonra size uygun plan ve teklif iletilir. İsterseniz kısa iletişim formunu açabilirim.",
    formTitle: "ÖN_KAYIT_FORMU",
    formDescription: "Gerekli alanları doldurun. Kayıt bu aşamada yalnızca oturum içinde tutulur.",
    fields: {
      name: "Ad soyad",
      email: "E-posta",
      phone: "Telefon (opsiyonel)",
      company: "Şirket / proje",
      website: "Website (opsiyonel)",
      preference: "Tercih edilen kanal",
      note: "Not (opsiyonel)",
    },
    contactOptions: {
      telegram: "Telegram",
      whatsapp: "WhatsApp",
      email: "Email",
      phone: "Telefon",
    },
    formSubmit: "ÖN_KAYDI_AL",
    requiredError: "Lütfen zorunlu alanları doldurun.",
    emailError: "Lütfen geçerli bir e-posta yazın.",
  },
  en: {
    label: "Core AI discovery interface",
    sidebarLabel: "Active agent protocols",
    status: "[LOCAL_MODE]",
    inputLabel: "Reply to the discovery assistant",
    submit: "SEND",
    processing: "Preparing response...",
    prompts: {
      business: "Describe your business or need...",
      friction: "Describe your business or need...",
      contact_prompt: "Should I open the form?",
      contact_form: "The form is open. You can also add a note...",
      completed: "You can add another note...",
    },
    messages: [
      {
        id: 1,
        role: "agent",
        content:
          "Hello. I am Leonardo Tales’ AI customer representative. Briefly describe your business, project, or the AI system you want to build; I will clarify the right starting point.",
      },
    ],
    frictionQuestion:
      "Which process is hardest right now: customer messages, website/digital presence, sales/proposals, operations/workflows, or unclear?",
    unclearGuidance:
      "That is normal. If it is not clear yet, choose the closest starting point: website/customer reception, sales/proposals, or operations/workflows?",
    casualReply:
      "Understood, no problem. Leonardo Tales mostly builds AI-supported websites and customer reception systems for businesses, agencies, and professional services. What kind of work do you do?",
    greetingReply:
      "Hello. Briefly describe your business, project, or the AI system you want to build; I will guide you to the right starting point.",
    unclearContactOffer:
      "I understand. The need may not be fully clear yet. A short initial conversation would be more useful. I can open the contact form so the system owner can reach you.",
    technicalGuidance:
      "You do not need technical knowledge at this stage. Choose the closest starting point first: website/customer reception, sales/proposals, or operations/workflows?",
    contactQuestion:
      "I can open a short contact form. Scope and pricing are determined after analysis.",
    openFormHint: "Opening the form. Fill in the required fields when ready.",
    formClosedHint: "Understood. Write 'open form' when you are ready.",
    formAlreadyOpen: "The form is open below. You can fill in the required fields.",
    completedReply:
      "Noted. Your information is kept in this session and can be connected to the system in the next sprint.",
    success:
      "I received your details. The next step is turning this need into a project analysis.",
    pricingReply:
      "I cannot quote pricing here. Scope, tools, and required work need to be analyzed first; then a suitable plan and proposal can be prepared. I can open the short contact form if you want.",
    formTitle: "LEAD_DRAFT_FORM",
    formDescription:
      "This sprint does not send the form to an external service; it only keeps it in session state.",
    fields: {
      name: "Name",
      email: "Email",
      phone: "Phone (optional)",
      company: "Company / project",
      website: "Website (optional)",
      preference: "Preferred channel",
      note: "Note (optional)",
    },
    contactOptions: {
      telegram: "Telegram",
      whatsapp: "WhatsApp",
      email: "Email",
      phone: "Phone",
    },
    formSubmit: "SAVE_DRAFT",
    requiredError: "Please fill in the required fields.",
    emailError: "Please enter a valid email.",
  },
} satisfies Record<
  Locale,
  {
    label: string;
    sidebarLabel: string;
    status: string;
    inputLabel: string;
    submit: string;
    processing: string;
    prompts: Record<DiscoveryStep, string>;
    messages: DiscoveryMessage[];
    frictionQuestion: string;
    unclearGuidance: string;
    casualReply: string;
    greetingReply: string;
    unclearContactOffer: string;
    technicalGuidance: string;
    contactQuestion: string;
    openFormHint: string;
    formClosedHint: string;
    formAlreadyOpen: string;
    completedReply: string;
    success: string;
    formTitle: string;
    formDescription: string;
    fields: Record<"name" | "email" | "phone" | "company" | "website" | "preference" | "note", string>;
    contactOptions: Record<ContactPreference, string>;
    formSubmit: string;
    requiredError: string;
    emailError: string;
    pricingReply: string;
  }
>;

const protocolAgents = ["[Discovery_Agent]", "[Classifier_Agent]", "[Lead_Form]"];
const responseDelayMs = 720;

const categoryKeywords: Record<DiscoveryCategory, string[]> = {
  customer_support_website: [
    "müşteri",
    "musteri",
    "mesaj",
    "whatsapp",
    "destek",
    "hizmet",
    "hizmetleri",
    "soru",
    "randevu",
    "randevu asistanı",
    "güzellik merkezi",
    "kuaför",
    "klinik",
    "estetik",
    "website",
    "web sitesi",
    "web",
    "site",
    "dijital",
    "işletme sitesi",
    "asistan",
    "ai asistan",
    "yapay zeka asistan",
    "yapay zekâ asistan",
    "yapay zeka müşteri temsilcisi",
    "yapay zekâ müşteri temsilcisi",
    "müşteri hizmetleri",
    "müşteri hizmetleri sistemi",
    "chatbot",
    "karşılama",
    "karşılayan",
    "müşteri temsilcisi",
    "emlak",
    "gayrimenkul",
    "customer",
    "support",
  ],
  sales_quote: [
    "satış",
    "teklif",
    "teklif hazırlama",
    "fiyat teklifi",
    "müşteri teklifleri",
    "satış süreci",
    "satış takibi",
    "fiyat",
    "proposal",
    "quote",
    "paket",
    "crm",
    "lead",
    "takip",
    "sales",
  ],
  operations_automation: [
    "operasyon",
    "iş akışı",
    "workflow",
    "görev takibi",
    "süreç yönetimi",
    "ekip içi takip",
    "raporlama",
    "rapor",
    "excel",
    "manuel",
    "otomasyon",
    "stok",
    "sipariş",
    "görev",
    "veri",
    "entegrasyon",
    "operations",
  ],
  unclear: ["bilmiyorum", "emin değil", "net değil", "kararsız", "rehber", "unclear"],
};

function normalizeText(value: string) {
  return value.trim().toLocaleLowerCase("tr-TR").replaceAll("aı", "ai");
}

function containsAny(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword));
}

function scoreKeywords(text: string, keywords: string[]) {
  return keywords.reduce(
    (total, keyword) => total + (text.includes(keyword) ? 1 : 0),
    0,
  );
}

function isUncertainText(command: string) {
  const text = normalizeText(command);
  return containsAny(text, [
    "bilmiyorum",
    "ne yapacağımı bilmiyorum",
    "nereden başlayacağımı bilmiyorum",
    "emin değilim",
    "net değil",
    "kararsızım",
    "ai bilmiyorum",
    "yapay zeka bilmiyorum",
    "yapay zekâ bilmiyorum",
    "i do not know",
    "i don't know",
    "not sure",
  ]);
}

function needsTechnicalGuidance(command: string) {
  const text = normalizeText(command);
  return containsAny(text, [
    "ai bilmiyorum",
    "ai kullanmak istiyorum",
    "yapay zeka bilmiyorum",
    "yapay zeka kullanmak istiyorum",
    "yapay zekâ bilmiyorum",
    "yapay zekâ kullanmak istiyorum",
    "teknik bilmiyorum",
    "nereden başlayacağımı bilmiyorum",
    "nasıl başlayacağımı bilmiyorum",
    "where to start",
  ]);
}

function isCasualOrNoIntent(command: string) {
  const text = normalizeText(command);
  return containsAny(text, [
    "canım sıkıldı",
    "öylesine",
    "öylesine yazdım",
    "kurmak istediğim bir şey yok",
    "sadece bakıyorum",
    "bakıyorum",
    "merak ettim",
    "boşuna",
    "just browsing",
    "just looking",
  ]);
}

function isSimpleGreeting(command: string) {
  const text = normalizeText(command).replace(/[.!?]/g, "");

  return [
    "merhaba",
    "selam",
    "selamlar",
    "iyi günler",
    "iyi akşamlar",
    "hello",
    "hi",
  ].includes(text);
}

function classifyNeed(business: string, friction: string) {
  const text = normalizeText(`${business} ${friction}`);
  const hasWebsite = containsAny(text, [
    "web sitesi",
    "website",
    "web site",
    "site",
    "dijital varlık",
  ]);
  const hasAssistant = containsAny(text, [
    "ai asistan",
    "yapay zeka asistan",
    "yapay zekâ asistan",
    "asistan",
    "chatbot",
    "müşteri temsilcisi",
    "müşteri hizmetleri",
    "müşteri hizmetleri sistemi",
    "karşılayan",
    "karşılama",
  ]);
  const hasCustomer = containsAny(text, [
    "müşteri",
    "musteri",
    "mesaj",
    "whatsapp",
    "karşılayan",
    "karşılama",
    "temsilci",
  ]);
  const isRealEstate = containsAny(text, ["emlak", "gayrimenkul", "real estate"]);
  const isAppointmentBusiness = containsAny(text, [
    "güzellik merkezi",
    "kuaför",
    "klinik",
    "estetik",
    "randevu",
  ]);

  const scores: Record<DiscoveryCategory, number> = {
    customer_support_website: scoreKeywords(
      text,
      categoryKeywords.customer_support_website,
    ),
    sales_quote: scoreKeywords(text, categoryKeywords.sales_quote),
    operations_automation: scoreKeywords(
      text,
      categoryKeywords.operations_automation,
    ),
    unclear: scoreKeywords(text, categoryKeywords.unclear),
  };

  if (hasWebsite && hasAssistant) {
    scores.customer_support_website += 6;
  }

  if (hasWebsite && hasCustomer) {
    scores.customer_support_website += 4;
  }

  if (hasAssistant && hasCustomer) {
    scores.customer_support_website += 3;
  }

  if (containsAny(text, ["chatbot", "müşteri hizmetleri", "müşteri temsilcisi"])) {
    scores.customer_support_website += 4;
  }

  if (containsAny(text, ["whatsapp"]) && hasCustomer) {
    scores.customer_support_website += 3;
  }

  if (isRealEstate && (hasWebsite || hasAssistant || hasCustomer)) {
    scores.customer_support_website += 3;
  }

  if (isAppointmentBusiness) {
    scores.customer_support_website += 4;
  }

  if (
    containsAny(text, [
      "teklif hazırl",
      "fiyat teklifi",
      "müşteri teklifleri",
      "satış takip",
      "satış süreci",
      "proposal",
      "quote",
    ])
  ) {
    scores.sales_quote += 4;
  }

  if (
    containsAny(text, [
      "iş akışı",
      "workflow",
      "operasyon",
      "görev",
      "görev takibi",
      "süreç yönetimi",
      "ekip içi takip",
      "rapor",
      "raporlama",
    ])
  ) {
    scores.operations_automation += 3;
  }

  const bestMatch = (
    Object.entries(scores).filter(([category]) => category !== "unclear") as [
      DiscoveryCategory,
      number,
    ][]
  ).sort((a, b) => b[1] - a[1])[0];

  if (!bestMatch || bestMatch[1] === 0) {
    return {
      category: "unclear" as const,
      confidence: 0,
    };
  }

  if (scores.unclear > 0 && bestMatch[1] < 2) {
    return {
      category: "unclear" as const,
      confidence: scores.unclear,
    };
  }

  return {
    category: bestMatch[0],
    confidence: bestMatch[1],
  };
}

function wantsFormConfirmation(command: string) {
  const text = normalizeText(command);
  return ["evet", "tamam", "aç", "form", "iletişim", "olur", "teklif", "yes", "open"].some((keyword) =>
    text.includes(keyword),
  );
}

function wantsDirectContact(command: string) {
  const text = normalizeText(command);
  return [
    "formu aç",
    "iletişim formu",
    "iletişim",
    "görüşelim",
    "insanla görüşmek",
    "insanla görüşmek istiyorum",
    "detayları konuşalım",
    "telefonla anlatayım",
    "beni ara",
    "arayın",
    "beni arayın",
    "ulaşın",
    "randevu",
    "iletişime geç",
  ].some((keyword) => text.includes(keyword));
}

function asksForPricing(command: string) {
  const text = normalizeText(command);
  if (
    containsAny(text, [
      "fiyat teklifi hazırl",
      "fiyat teklifi sistemi",
      "müşteri teklifleri",
    ])
  ) {
    return false;
  }

  return [
    "fiyat",
    "ücret",
    "bütçe",
    "paket",
    "ne kadar",
    "kaç para",
    "price",
    "pricing",
    "cost",
    "quote",
    "fee",
  ].some((keyword) => text.includes(keyword));
}

function asksForProposal(command: string) {
  const text = normalizeText(command);
  return [
    "teklif almak",
    "teklif istiyorum",
    "teklif ver",
    "teklif gönder",
    "proposal",
  ].some((keyword) => text.includes(keyword));
}

function describeBusiness(value: string) {
  const text = normalizeText(value);

  if (text.includes("emlak") || text.includes("gayrimenkul")) {
    return "Emlak ofisi";
  }

  if (text.includes("güzellik merkezi")) {
    return "Güzellik merkezi";
  }

  const firstSentence = value.split(/[.!?\n]/)[0]?.trim() || value.trim();
  return firstSentence.length > 76
    ? `${firstSentence.slice(0, 73).trim()}...`
    : firstSentence;
}

function describeNeed(category: DiscoveryCategory, value: string) {
  const text = normalizeText(value);

  if (
    category === "customer_support_website" &&
    containsAny(text, ["web", "site", "website"]) &&
    containsAny(text, ["asistan", "chatbot", "karşılayan", "karşılama", "müşteri"])
  ) {
    return "Web sitesi + müşteri karşılama asistanı";
  }

  if (category === "customer_support_website") {
    return "Müşteri iletişimi ve web deneyimi";
  }

  if (category === "sales_quote") {
    return "Satış/teklif süreci";
  }

  if (category === "operations_automation") {
    return "Operasyon/iş akışı otomasyonu";
  }

  return "İhtiyaç netleştirme";
}

function formatBusinessAwareExplanation(
  category: DiscoveryCategory,
  business: string,
  need: string,
  locale: Locale,
  unclearContactOffer: string,
) {
  const text = normalizeText(`${business} ${need}`);
  const businessLabel = describeBusiness(business);

  if (category === "unclear") {
    return unclearContactOffer;
  }

  if (locale === "en") {
    if (category === "sales_quote") {
      return "I understand. Your need looks like an AI system that makes your sales and proposal process faster and more organized. If that is correct, I can open the short contact form.";
    }

    if (category === "operations_automation") {
      return "I understand. Your need looks like an automation system that helps track operations and workflows more clearly. If that is correct, I can open the short contact form.";
    }

    return "I understand. Your need looks like a professional website and an AI customer representative system that can greet visitors on that site. This can help you manage customer messages more clearly and look stronger digitally. I can open the short contact form if you want.";
  }

  if (category === "sales_quote") {
    return "Sizi anlıyorum. İhtiyacınız, satış ve teklif sürecinizi daha düzenli hale getirecek bir yapay zekâ sistemi gibi görünüyor.\n\nBu yapı, müşteri taleplerini daha net toplamanıza ve teklif hazırlama sürecini daha kontrollü yönetmenize yardımcı olabilir.\n\nDilerseniz sistem yetkilisinin size ulaşabilmesi için kısa iletişim formunu açabilirim.";
  }

  if (category === "operations_automation") {
    return "Sizi anlıyorum. İhtiyacınız, operasyon ve iş akışlarınızı daha düzenli takip edecek bir otomasyon sistemi gibi görünüyor.\n\nBu yapı, tekrar eden işleri daha kontrollü hale getirmenize ve ekip içi takibi sadeleştirmenize yardımcı olabilir.\n\nDilerseniz detayları görüşebilmek için kısa iletişim formunu açabilirim.";
  }

  if (businessLabel === "Güzellik merkezi" || text.includes("güzellik merkezi")) {
    return "Güzellik merkezi için en doğru başlangıç genelde web sitesi ve yapay zekâ müşteri karşılama/randevu asistanı olur.\n\nBu sistem hizmetlerinizi anlatabilir, gelen soruları karşılayabilir, randevu taleplerini toplayabilir ve size düzenli müşteri talebi olarak iletebilir.\n\nBu, müşteri mesajlarını daha düzenli yönetmeniz ve dijitalde daha güçlü görünmeniz için önemli bir fırsat olabilir.\n\nDilerseniz detayları görüşebilmek için kısa iletişim formunu açabilirim.";
  }

  if (businessLabel === "Emlak ofisi" && containsAny(text, ["web", "site", "website"])) {
    return "Sizi anlıyorum. İhtiyacınız, emlak ofisiniz için profesyonel bir web sitesi ve bu site üzerinde müşterileri karşılayacak bir yapay zekâ müşteri temsilcisi sistemi gibi görünüyor.\n\nBu yapı, gelen müşterileri daha düzenli karşılamanıza ve talepleri daha net şekilde toplamanıza yardımcı olabilir.\n\nİsterseniz sistem yetkilisinin size ulaşabilmesi için kısa iletişim formunu açabilirim.";
  }

  return "Sizi anlıyorum. İhtiyacınız, işletmeniz için profesyonel bir web sitesi ve bu site üzerinde müşterileri karşılayacak bir yapay zekâ müşteri temsilcisi sistemi gibi görünüyor.\n\nBu yapı, müşteri mesajlarını daha düzenli karşılamanıza ve dijitalde daha güçlü görünmenize yardımcı olabilir.\n\nDilerseniz kısa iletişim formunu açabilirim.";
}

function formatSummary(
  category: DiscoveryCategory,
  business: string,
  need: string,
  locale: Locale,
  unclearContactOffer: string,
) {
  return formatBusinessAwareExplanation(
    category,
    business,
    need,
    locale,
    unclearContactOffer,
  );
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function CoreAiChat({ locale }: { locale: Locale }) {
  const copy = chatCopy[locale];
  const [messages, setMessages] = useState<DiscoveryMessage[]>(copy.messages);
  const [command, setCommand] = useState("");
  const [step, setStep] = useState<DiscoveryStep>("business");
  const [businessSummary, setBusinessSummary] = useState("");
  const [frictionSummary, setFrictionSummary] = useState("");
  const [category, setCategory] = useState<DiscoveryCategory>("unclear");
  const [leadDraft, setLeadDraft] = useState<LeadDraft>(emptyLeadDraft);
  const [submittedLead, setSubmittedLead] = useState<SubmittedLead | null>(null);
  const [formError, setFormError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const responseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const messageIdRef = useRef(
    Math.max(...copy.messages.map((message) => message.id)) + 1,
  );

  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: step === "contact_form" ? "auto" : "smooth",
      });
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [messages, step, formError, isProcessing]);

  useEffect(() => {
    return () => {
      if (responseTimerRef.current) {
        clearTimeout(responseTimerRef.current);
      }
    };
  }, []);

  function createMessage(
    role: DiscoveryMessage["role"],
    content: string,
    tone?: DiscoveryMessage["tone"],
  ): DiscoveryMessage {
    const id = messageIdRef.current;
    messageIdRef.current += 1;

    return {
      id,
      role,
      content,
      tone,
    };
  }

  function appendMessages(nextMessages: DiscoveryMessage[]) {
    setMessages((currentMessages) => [...currentMessages, ...nextMessages]);
  }

  function prepareAssistantResponse(trimmedCommand: string) {
    const nextMessages: DiscoveryMessage[] = [];
    if (asksForPricing(trimmedCommand) || asksForProposal(trimmedCommand)) {
      nextMessages.push(createMessage("agent", copy.pricingReply, "gold"));
      if (step !== "contact_form" && step !== "completed") {
        setStep("contact_prompt");
      }
      appendMessages(nextMessages);
      return;
    }

    if (wantsDirectContact(trimmedCommand) && step !== "contact_form") {
      setStep("contact_form");
      nextMessages.push(createMessage("agent", copy.openFormHint, "gold"));
      appendMessages(nextMessages);
      return;
    }

    if (step === "business") {
      if (isSimpleGreeting(trimmedCommand)) {
        setStep("business");
        nextMessages.push(createMessage("agent", copy.greetingReply, "gold"));
        appendMessages(nextMessages);
        return;
      }

      if (isCasualOrNoIntent(trimmedCommand)) {
        setBusinessSummary("Henüz netleşmemiş ziyaretçi");
        setStep("business");
        nextMessages.push(createMessage("agent", copy.casualReply, "gold"));
        appendMessages(nextMessages);
        return;
      }

      if (isUncertainText(trimmedCommand)) {
        setBusinessSummary("Henüz netleşmemiş ihtiyaç");
        setStep("friction");
        nextMessages.push(
          createMessage(
            "agent",
            needsTechnicalGuidance(trimmedCommand)
              ? copy.technicalGuidance
              : copy.unclearGuidance,
            "gold",
          ),
        );
        appendMessages(nextMessages);
        return;
      }

      const firstClassification = classifyNeed(trimmedCommand, "");
      setBusinessSummary(trimmedCommand);

      if (
        firstClassification.category !== "unclear" &&
        firstClassification.confidence >= 4
      ) {
        setFrictionSummary(describeNeed(firstClassification.category, trimmedCommand));
        setCategory(firstClassification.category);
        setStep("contact_prompt");
        nextMessages.push(
          createMessage(
            "agent",
            formatSummary(
              firstClassification.category,
              trimmedCommand,
              describeNeed(firstClassification.category, trimmedCommand),
              locale,
              copy.unclearContactOffer,
            ),
            "neon",
          ),
        );
      } else {
        setStep("friction");
        nextMessages.push(createMessage("agent", copy.frictionQuestion, "gold"));
      }
    } else if (step === "friction") {
      if (isUncertainText(trimmedCommand)) {
        setCategory("unclear");
        setStep("contact_prompt");
        nextMessages.push(createMessage("agent", copy.unclearContactOffer, "gold"));
        appendMessages(nextMessages);
        return;
      }

      const nextClassification = classifyNeed(businessSummary, trimmedCommand);
      setFrictionSummary(trimmedCommand);

      if (nextClassification.category === "unclear") {
        setCategory("unclear");
        setStep("contact_prompt");
        nextMessages.push(createMessage("agent", copy.unclearContactOffer, "gold"));
      } else {
        setCategory(nextClassification.category);
        setStep("contact_prompt");
        nextMessages.push(
          createMessage(
            "agent",
            formatSummary(
              nextClassification.category,
              businessSummary,
              trimmedCommand,
              locale,
              copy.unclearContactOffer,
            ),
            "neon",
          ),
        );
      }
    } else if (step === "contact_prompt") {
      if (wantsFormConfirmation(trimmedCommand)) {
        setStep("contact_form");
        nextMessages.push(createMessage("agent", copy.openFormHint, "gold"));
      } else {
        nextMessages.push(createMessage("agent", copy.formClosedHint));
      }
    } else if (step === "contact_form") {
      nextMessages.push(createMessage("agent", copy.formAlreadyOpen));
    } else if (step === "completed") {
      nextMessages.push(createMessage("agent", copy.completedReply));
    }

    appendMessages(nextMessages);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedCommand = command.trim();
    if (!trimmedCommand || isProcessing) {
      return;
    }

    appendMessages([createMessage("user", trimmedCommand)]);
    setCommand("");
    setIsProcessing(true);

    responseTimerRef.current = setTimeout(() => {
      prepareAssistantResponse(trimmedCommand);
      setIsProcessing(false);
      responseTimerRef.current = null;
    }, responseDelayMs);
  }

  function updateLeadDraft<Field extends keyof LeadDraft>(
    field: Field,
    value: LeadDraft[Field],
  ) {
    setLeadDraft((currentDraft) => ({
      ...currentDraft,
      [field]: value,
    }));
    setFormError("");
  }

  function handleLeadSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !leadDraft.name.trim() ||
      !leadDraft.email.trim() ||
      !leadDraft.company_or_project.trim()
    ) {
      setFormError(copy.requiredError);
      return;
    }

    if (!isValidEmail(leadDraft.email)) {
      setFormError(copy.emailError);
      return;
    }

    const nextLead: SubmittedLead = {
      ...leadDraft,
      name: leadDraft.name.trim(),
      email: leadDraft.email.trim(),
      phone: leadDraft.phone.trim(),
      company_or_project: leadDraft.company_or_project.trim(),
      website: leadDraft.website.trim(),
      note: leadDraft.note.trim(),
      category,
      businessSummary,
      frictionSummary,
      business_type: describeBusiness(businessSummary),
      detected_need: describeNeed(category, `${businessSummary} ${frictionSummary}`),
      source: "leonardo_tales_ai_representative",
      status: "new",
      conversation_summary: `${describeBusiness(businessSummary)} — ${describeNeed(
        category,
        `${businessSummary} ${frictionSummary}`,
      )}`,
      next_action: "human_follow_up_required",
      createdAt: new Date().toISOString(),
    };

    setSubmittedLead(nextLead);
    setStep("completed");
    setFormError("");
    setLeadDraft(emptyLeadDraft);
    appendMessages([createMessage("agent", copy.success, "neon")]);
  }

  const placeholder = copy.prompts[step];
  const pathValue =
    step === "business" || step === "friction" ? "WAITING" : categoryCodes[category];
  const leadValue = submittedLead ? "READY" : step === "contact_form" ? "DRAFT" : "LOCAL";

  return (
    <div className="core-chat-shell" aria-label={copy.label}>
      <aside className="core-chat-sidebar" aria-label={copy.sidebarLabel}>
        <p className="core-chat-sidebar-title">ACTIVE_PROTOCOLS</p>
        <div className="core-chat-agent-list">
          {protocolAgents.map((agent) => (
            <span className="core-chat-agent" key={agent}>
              {agent}
            </span>
          ))}
        </div>
        <div className="core-chat-sidebar-metrics" aria-hidden="true">
          <p>
            <span>MODE</span>
            <strong className="tone-gold">LOCAL</strong>
          </p>
          <p>
            <span>PATH</span>
            <strong className="tone-neon">{pathValue}</strong>
          </p>
          <p>
            <span>LEAD</span>
            <strong>{leadValue}</strong>
          </p>
        </div>
      </aside>

      <section className="core-chat-main">
        <div className="core-chat-titlebar">
          <div className="core-chat-title">
            <span className="status-dot" aria-hidden="true" />
            <span>SYSTEM_DISCOVERY_AGENT_V1.0.md</span>
          </div>
          <span className="core-chat-title-status">{copy.status}</span>
        </div>

        <div className="core-chat-messages" ref={scrollRef}>
          {messages.map((message) => (
            <div
              className={
                message.role === "user"
                  ? "chat-message chat-message-user"
                  : "chat-message chat-message-agent"
              }
              key={message.id}
            >
              {message.role === "agent" ? (
                <span className="chat-message-prefix">[AI]</span>
              ) : null}
              <span
                className={
                  message.tone === "gold"
                    ? "chat-message-text tone-gold"
                    : message.tone === "neon"
                      ? "chat-message-text tone-neon"
                      : "chat-message-text"
                }
              >
                {message.content}
              </span>
            </div>
          ))}

          {isProcessing ? (
            <div className="chat-message chat-message-agent chat-message-processing">
              <span className="chat-message-prefix">[AI]</span>
              <span className="chat-message-text tone-neon">{copy.processing}</span>
            </div>
          ) : null}

          {step === "contact_form" ? (
            <form className="core-chat-contact-panel" onSubmit={handleLeadSubmit}>
              <div className="core-chat-contact-header">
                <strong>{copy.formTitle}</strong>
                <span>{categoryLabels[category]}</span>
              </div>
              <p>{copy.formDescription}</p>

              <div className="core-chat-form-grid">
                <label>
                  <span>{copy.fields.name}</span>
                  <input
                    autoComplete="name"
                    onChange={(event) => updateLeadDraft("name", event.target.value)}
                    required
                    type="text"
                    value={leadDraft.name}
                  />
                </label>
                <label>
                  <span>{copy.fields.email}</span>
                  <input
                    autoComplete="email"
                    onChange={(event) => updateLeadDraft("email", event.target.value)}
                    required
                    type="email"
                    value={leadDraft.email}
                  />
                </label>
                <label>
                  <span>{copy.fields.phone}</span>
                  <input
                    autoComplete="tel"
                    onChange={(event) => updateLeadDraft("phone", event.target.value)}
                    type="tel"
                    value={leadDraft.phone}
                  />
                </label>
                <label>
                  <span>{copy.fields.company}</span>
                  <input
                    autoComplete="organization"
                    onChange={(event) =>
                      updateLeadDraft("company_or_project", event.target.value)
                    }
                    required
                    type="text"
                    value={leadDraft.company_or_project}
                  />
                </label>
                <label>
                  <span>{copy.fields.website}</span>
                  <input
                    autoComplete="url"
                    onChange={(event) => updateLeadDraft("website", event.target.value)}
                    type="url"
                    value={leadDraft.website}
                  />
                </label>
                <label>
                  <span>{copy.fields.preference}</span>
                  <select
                    onChange={(event) =>
                      updateLeadDraft(
                        "preferred_contact_channel",
                        event.target.value as ContactPreference,
                      )
                    }
                    value={leadDraft.preferred_contact_channel}
                  >
                    {Object.entries(copy.contactOptions).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="core-chat-form-wide">
                  <span>{copy.fields.note}</span>
                  <textarea
                    onChange={(event) => updateLeadDraft("note", event.target.value)}
                    rows={3}
                    value={leadDraft.note}
                  />
                </label>
              </div>

              {formError ? <p className="core-chat-form-error">{formError}</p> : null}

              <button className="core-chat-submit core-chat-contact-submit" type="submit">
                {copy.formSubmit}
              </button>
            </form>
          ) : null}
        </div>

        <form className="core-chat-inputbar" onSubmit={handleSubmit}>
          <div className="core-chat-input-wrap">
            <span aria-hidden="true">core:~$</span>
            <input
              aria-label={copy.inputLabel}
              className="core-chat-input"
              disabled={isProcessing}
              onChange={(event) => setCommand(event.target.value)}
              placeholder={placeholder}
              suppressHydrationWarning
              type="text"
              value={command}
            />
          </div>
          <button className="core-chat-submit" disabled={isProcessing} type="submit">
            {isProcessing ? "..." : copy.submit}
          </button>
        </form>
      </section>
    </div>
  );
}
