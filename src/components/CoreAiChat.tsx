"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import type { LeadSubmissionResult } from "@/lib/leads/types";

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

type AgentProcessKey =
  | "visitor.greet"
  | "need.detect"
  | "solution.map"
  | "human.review";

type AgentProcessState = "active" | "scanning" | "ready" | "waiting";

type QuickIntent = {
  label: string;
  value: string;
  category: DiscoveryCategory;
};

type ProcessStepCopy = {
  label: string;
  detail: AgentProcessKey;
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
    label: "Hakan Leonardo yapay zekâ keşif arayüzü",
    title: "Yapay Zekâ İş Temsilcisi",
    status: "HAKAN_LEONARDO / ONLINE",
    agentBadge: "AI Temsilci",
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
          "Merhaba, ben Hakan Leonardo’nun AI iş temsilcisiyim.\n\nWeb sitenize müşteri karşılayan, lead toplayan veya satış/operasyon akışlarını düzenleyen bir sistem kurmak için sizi doğru başlangıca yönlendirebilirim.\n\nNereden başlamak istersiniz?",
      },
    ],
    quickIntentLabel: "Hızlı başlangıç seçin",
    quickIntents: [
      {
        label: "AI müşteri temsilcisi kurmak istiyorum",
        value: "AI müşteri temsilcisi kurmak istiyorum",
        category: "customer_support_website",
      },
      {
        label: "Satış / teklif sistemimi otomatikleştirmek istiyorum",
        value: "Satış / teklif sistemimi otomatikleştirmek istiyorum",
        category: "sales_quote",
      },
      {
        label: "Operasyon süreçlerimi sadeleştirmek istiyorum",
        value: "Operasyon süreçlerimi sadeleştirmek istiyorum",
        category: "operations_automation",
      },
      {
        label: "Henüz bilmiyorum, beni yönlendir",
        value: "Henüz bilmiyorum, beni yönlendir",
        category: "unclear",
      },
    ],
    processLabel: "Ajan süreci",
    processSteps: {
      "visitor.greet": {
        label: "Karşılama",
        detail: "visitor.greet",
      },
      "need.detect": {
        label: "İhtiyaç Analizi",
        detail: "need.detect",
      },
      "solution.map": {
        label: "Çözüm Haritası",
        detail: "solution.map",
      },
      "human.review": {
        label: "İnsan Onayı",
        detail: "human.review",
      },
    },
    nextQuestions: {
      customer_support_website:
        "Başlangıç iyi. Müşteri temsilcisi hangi kanalda çalışmalı: web sitesi, WhatsApp, randevu/mesaj akışı veya hepsi mi?",
      sales_quote:
        "Anladım. Satış/teklif tarafında en çok nerede zaman kaybediyorsunuz: lead toplama, müşteri özeti, teklif hazırlama veya takip mi?",
      operations_automation:
        "Tamam. Operasyonda sadeleştirmek istediğiniz ilk akış hangisi: görev takibi, form/veri aktarımı, raporlama veya ekip içi takip mi?",
      unclear:
        "Sorun değil. Önce işinizi ve şu anda en çok vakit alan müşteri, satış veya operasyon sürecini tek cümleyle yazın.",
    },
    frictionQuestion:
      "Size daha doğru yardımcı olabilmem için şunu netleştirelim: ihtiyacınız daha çok web sitesi ve müşteri karşılama, satış/teklif süreci veya operasyon/iş akışı tarafında mı?",
    unclearGuidance:
      "Bu normal. Henüz netleşmediyse önce en temel noktayı seçelim: web sitesi ve müşteri karşılama, satış/teklif süreci veya operasyon/iş akışı tarafında mı ilerleyelim?",
    casualReply:
      "Anladım, sorun değil. Hakan Leonardo en çok işletmeler, ajanslar ve profesyonel hizmetler için yapay zekâ destekli web sitesi, müşteri karşılama ve iş otomasyonu sistemleri kurar. Siz ne işle uğraşıyorsunuz?",
    greetingReply:
      "Merhaba. İşinizi, projenizi veya kurmak istediğiniz yapay zekâ sistemini kısaca yazın; sizi doğru başlangıç noktasına yönlendireyim.",
    unclearContactOffer:
      "Sizi anlıyorum. İhtiyaç henüz tam netleşmemiş olabilir. Bu durumda kısa bir ön görüşme daha doğru olur. Hakan Leonardo tarafının size ulaşabilmesi için iletişim formunu açabilirim.",
    technicalGuidance:
      "Bu aşamada teknik bilmeniz gerekmiyor. Önce en temel noktayı seçelim: web sitesi ve müşteri karşılama, satış/teklif süreci veya operasyon/iş akışı tarafında mı ilerleyelim?",
    contactQuestion:
      "İstersen kısa iletişim formunu açabilirim. Kapsam ve fiyat, ihtiyaç analizinden sonra netleşir.",
    openFormHint:
      "Tabii. Hakan Leonardo tarafının size ulaşabilmesi için kısa iletişim formunu doldurabilirsiniz.",
    formClosedHint: "Tamam. Hazır olduğunda 'formu aç' yazman yeterli.",
    formAlreadyOpen: "Form aşağıda açık. Gerekli alanları doldurabilirsin.",
    completedReply:
      "Notu aldım. İhtiyaçların proje analizine dönüştürülebilir.",
    success:
      "Bilgileriniz alındı. Hakan Leonardo tarafı sizinle iletişime geçerek ihtiyacınızı netleştirecektir. Güzel bir başlangıç olabilir.",
    pricingReply:
      "Benim fiyat verme yetkim bulunmuyor. Kapsam, kullanılacak araçlar ve ihtiyaç duyulan çalışma süresi analiz edildikten sonra size uygun plan ve teklif iletilir. İsterseniz kısa iletişim formunu açabilirim.",
    harmfulRefusal:
      "Bu tür yetkisiz veya zararlı işlemlere yardımcı olamam. Hakan Leonardo yalnızca yasal, güvenli ve işletme odaklı yapay zekâ sistemleri kurar. İsterseniz siber güvenlik farkındalığı, güvenli otomasyon veya yasal iş süreçleri için yardımcı olabilirim.",
    oversizedVisionReply:
      "Bu büyük ölçekli bir ürün vizyonu. İlk adım olarak belirli bir alan için küçük bir arama/keşif prototipi, bilgi tabanı veya niş arama asistanı tasarlanabilir. İsterseniz bunu gerçekçi bir MVP keşif görüşmesi olarak değerlendirmek için kısa formu açabilirim.",
    formTitle: "ÖN_KAYIT_FORMU",
    formDescription:
      "Gerekli alanları doldurun. Bilgileriniz proje ihtiyacınızı değerlendirmek için alınır.",
    fields: {
      name: "Ad soyad",
      email: "E-posta",
      phone: "Telefon (opsiyonel)",
      company: "Şirket / proje",
      website: "Website (opsiyonel, varsa)",
      preference: "Size hangi kanaldan ulaşalım?",
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
    label: "Hakan Leonardo AI discovery interface",
    title: "AI Business Representative",
    status: "HAKAN_LEONARDO / ONLINE",
    agentBadge: "AI Representative",
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
          "Hello, I am Hakan Leonardo’s AI business representative.\n\nI can guide you toward a system that greets customers, captures leads, or organizes sales and operations flows for your website.\n\nWhere would you like to begin?",
      },
    ],
    quickIntentLabel: "Choose a quick start",
    quickIntents: [
      {
        label: "I want to build an AI customer representative",
        value: "I want to build an AI customer representative",
        category: "customer_support_website",
      },
      {
        label: "I want to automate sales / proposals",
        value: "I want to automate sales / proposals",
        category: "sales_quote",
      },
      {
        label: "I want to simplify operations workflows",
        value: "I want to simplify operations workflows",
        category: "operations_automation",
      },
      {
        label: "I am not sure, guide me",
        value: "I am not sure, guide me",
        category: "unclear",
      },
    ],
    processLabel: "Agent process",
    processSteps: {
      "visitor.greet": {
        label: "Greeting",
        detail: "visitor.greet",
      },
      "need.detect": {
        label: "Need Analysis",
        detail: "need.detect",
      },
      "solution.map": {
        label: "Solution Map",
        detail: "solution.map",
      },
      "human.review": {
        label: "Human Review",
        detail: "human.review",
      },
    },
    nextQuestions: {
      customer_support_website:
        "Good starting point. Where should the representative work first: website, WhatsApp, appointments/messages, or all of them?",
      sales_quote:
        "Understood. Where does sales lose the most time today: lead intake, customer summaries, proposal drafting, or follow-up?",
      operations_automation:
        "Understood. Which operations flow should be simplified first: task tracking, form/data handoff, reporting, or internal follow-up?",
      unclear:
        "No problem. In one sentence, describe your business and the customer, sales, or operations process that takes the most time.",
    },
    frictionQuestion:
      "Which process is hardest right now: customer messages, website/digital presence, sales/proposals, operations/workflows, or unclear?",
    unclearGuidance:
      "That is normal. If it is not clear yet, choose the closest starting point: website/customer reception, sales/proposals, or operations/workflows?",
    casualReply:
      "Understood, no problem. Hakan Leonardo mostly builds AI-supported websites, customer reception systems, and business automation flows for businesses, agencies, and professional services. What kind of work do you do?",
    greetingReply:
      "Hello. Briefly describe your business, project, or the AI system you want to build; I will guide you to the right starting point.",
    unclearContactOffer:
      "I understand. The need may not be fully clear yet. A short initial conversation would be more useful. I can open the contact form so the Hakan Leonardo side can reach you.",
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
    harmfulRefusal:
      "I cannot help with unauthorized or harmful activity. Hakan Leonardo only builds legal, safe, business-focused AI systems. I can help with security awareness, safe automation, or lawful business workflows.",
    oversizedVisionReply:
      "That is a large-scale product vision. A safer first step would be a small search/discovery prototype, knowledge base, or niche search assistant for one clear domain. I can open the form if you want to frame it as an MVP discovery call.",
    formTitle: "LEAD_DRAFT_FORM",
    formDescription:
      "Fill in the required fields. Your details are used to evaluate the project need.",
    fields: {
      name: "Name",
      email: "Email",
      phone: "Phone (optional)",
      company: "Company / project",
      website: "Website (optional, if any)",
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
    title: string;
    status: string;
    agentBadge: string;
    inputLabel: string;
    submit: string;
    processing: string;
    prompts: Record<DiscoveryStep, string>;
    messages: DiscoveryMessage[];
    quickIntentLabel: string;
    quickIntents: QuickIntent[];
    processLabel: string;
    processSteps: Record<AgentProcessKey, ProcessStepCopy>;
    nextQuestions: Record<DiscoveryCategory, string>;
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
    harmfulRefusal: string;
    oversizedVisionReply: string;
  }
>;

const responseDelayMs = 1_400;

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
    "güzellik merkezim",
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
    "güzellik merkezim",
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

function isHarmfulIntent(command: string) {
  const text = normalizeText(command);
  return containsAny(text, [
    "hacklemek",
    "hack yap",
    "hack sistemi",
    "yetkisiz erişim",
    "izinsiz erişim",
    "şifre çal",
    "sifre cal",
    "credential",
    "kimlik bilgisi çal",
    "malware",
    "zararlı yazılım",
    "virüs",
    "virus",
    "ddos",
    "güvenlik sistemini aş",
    "guvenlik sistemini as",
    "hesap ele geçir",
    "hesap ele gecir",
    "phishing",
    "oltalama",
    "nasayı hack",
    "nasa'yı hack",
    "hack nasa",
  ]);
}

function isOversizedProductRequest(command: string) {
  const text = normalizeText(command);
  return containsAny(text, [
    "google'a rakip",
    "googlea rakip",
    "google rakibi",
    "google gibi arama motoru",
    "arama motoru kurmak",
    "dünyanın en büyük",
    "her şeyi yapan yapay zeka",
    "her seyi yapan yapay zeka",
    "chatgpt rakibi",
    "openai rakibi",
    "global platform",
    "milyarlarca kullanıcı",
  ]);
}

function describeBusiness(value: string) {
  const text = normalizeText(value);

  if (text.includes("emlak") || text.includes("gayrimenkul")) {
    return "Emlak ofisi";
  }

  if (text.includes("güzellik merkezi") || text.includes("güzellik merkezim")) {
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
    return "Sizi anlıyorum. İhtiyacınız, satış ve teklif sürecinizi daha düzenli hale getirecek bir yapay zekâ sistemi gibi görünüyor.\n\nBu yapı, müşteri taleplerini daha net toplamanıza ve teklif hazırlama sürecini daha kontrollü yönetmenize yardımcı olabilir.\n\nDilerseniz Hakan Leonardo tarafının size ulaşabilmesi için kısa iletişim formunu açabilirim.";
  }

  if (category === "operations_automation") {
    return "Sizi anlıyorum. İhtiyacınız, operasyon ve iş akışlarınızı daha düzenli takip edecek bir otomasyon sistemi gibi görünüyor.\n\nBu yapı, tekrar eden işleri daha kontrollü hale getirmenize ve ekip içi takibi sadeleştirmenize yardımcı olabilir.\n\nDilerseniz detayları görüşebilmek için kısa iletişim formunu açabilirim.";
  }

  if (
    businessLabel === "Güzellik merkezi" ||
    text.includes("güzellik merkezi") ||
    text.includes("güzellik merkezim")
  ) {
    return "Güzellik merkezi için en doğru başlangıç genelde web sitesi ve yapay zekâ müşteri karşılama/randevu asistanı olur.\n\nBu sistem hizmetlerinizi anlatabilir, gelen soruları karşılayabilir, randevu taleplerini toplayabilir ve size düzenli müşteri talebi olarak iletebilir.\n\nBu, müşteri mesajlarını daha düzenli yönetmeniz ve dijitalde daha güçlü görünmeniz için önemli bir fırsat olabilir.\n\nDilerseniz detayları görüşebilmek için kısa iletişim formunu açabilirim.";
  }

  if (businessLabel === "Emlak ofisi" && containsAny(text, ["web", "site", "website"])) {
    return "Sizi anlıyorum. İhtiyacınız, emlak ofisiniz için profesyonel bir web sitesi ve bu site üzerinde müşterileri karşılayacak bir yapay zekâ müşteri temsilcisi sistemi gibi görünüyor.\n\nBu yapı, gelen müşterileri daha düzenli karşılamanıza ve talepleri daha net şekilde toplamanıza yardımcı olabilir.\n\nİsterseniz Hakan Leonardo tarafının size ulaşabilmesi için kısa iletişim formunu açabilirim.";
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

function normalizeWebsiteInput(value: string) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "";
  }

  if (/^https?:\/\//i.test(trimmedValue)) {
    return trimmedValue;
  }

  if (/^www\./i.test(trimmedValue)) {
    return `https://${trimmedValue}`;
  }

  return trimmedValue;
}

function detectGuidedIntent(command: string): DiscoveryCategory | null {
  const text = normalizeText(command);

  if (
    containsAny(text, [
      "ai müşteri temsilcisi kurmak",
      "müşteri temsilcisi kurmak",
      "customer representative",
      "müşteri temsilcisi istiyorum",
    ])
  ) {
    return "customer_support_website";
  }

  if (
    containsAny(text, [
      "satış / teklif",
      "satış teklif",
      "teklif sistemimi",
      "sales / proposal",
      "sales proposal",
      "automate sales",
    ])
  ) {
    return "sales_quote";
  }

  if (
    containsAny(text, [
      "operasyon süreçlerimi",
      "operasyon sureclerimi",
      "iş akışı sadeleştirmek",
      "workflow",
      "operations workflows",
      "simplify operations",
    ])
  ) {
    return "operations_automation";
  }

  if (
    containsAny(text, [
      "henüz bilmiyorum",
      "henuz bilmiyorum",
      "beni yönlendir",
      "beni yonlendir",
      "not sure",
      "guide me",
    ])
  ) {
    return "unclear";
  }

  return null;
}

function shouldAskStructuredQuestion(command: string, category: DiscoveryCategory) {
  const text = normalizeText(command);

  if (category === "unclear") {
    return isUncertainText(command) || detectGuidedIntent(command) === "unclear";
  }

  return (
    detectGuidedIntent(command) === category ||
    (command.length < 96 &&
      containsAny(text, [
        "kurmak istiyorum",
        "otomatikleştirmek istiyorum",
        "otomatiklestirmek istiyorum",
        "sadeleştirmek istiyorum",
        "sadelestirmek istiyorum",
        "want to build",
        "want to automate",
        "want to simplify",
      ]))
  );
}

function getAgentProcessStates(
  step: DiscoveryStep,
  isProcessing: boolean,
): Record<AgentProcessKey, AgentProcessState> {
  if (step === "completed") {
    return {
      "visitor.greet": "ready",
      "need.detect": "ready",
      "solution.map": "ready",
      "human.review": "ready",
    };
  }

  if (step === "contact_form") {
    return {
      "visitor.greet": "ready",
      "need.detect": "ready",
      "solution.map": "ready",
      "human.review": isProcessing ? "scanning" : "active",
    };
  }

  if (step === "contact_prompt") {
    return {
      "visitor.greet": "ready",
      "need.detect": "ready",
      "solution.map": isProcessing ? "scanning" : "ready",
      "human.review": "waiting",
    };
  }

  if (step === "friction") {
    return {
      "visitor.greet": "ready",
      "need.detect": isProcessing ? "scanning" : "active",
      "solution.map": "waiting",
      "human.review": "waiting",
    };
  }

  return {
    "visitor.greet": "active",
    "need.detect": isProcessing ? "scanning" : "waiting",
    "solution.map": "waiting",
    "human.review": "waiting",
  };
}

function formatLeadUnderstandingSummary(
  category: DiscoveryCategory,
  business: string,
  need: string,
  locale: Locale,
) {
  const businessLabel =
    business && !detectGuidedIntent(business) ? describeBusiness(business) : "";
  const needLabel = describeNeed(category, `${business} ${need}`);

  if (locale === "en") {
    if (category === "unclear") {
      return "Summary: the need is not fully clear yet. A short human-reviewed discovery conversation is the right next step.";
    }

    return `Summary: I understand this as ${categoryLabels[category]} for ${businessLabel || "your business"}. The first scope is ${needLabel}. I can now open the human-reviewed discovery form.`;
  }

  if (category === "unclear") {
    return "Özet: ihtiyaç henüz tam netleşmedi. Kısa, insan onaylı bir keşif görüşmesi en doğru sonraki adım olur.";
  }

  return `Özet: bunu ${businessLabel || "işletmeniz"} için ${categoryLabels[category]} ihtiyacı olarak anladım. İlk kapsam: ${needLabel}. Şimdi insan onaylı keşif formunu açabilirim.`;
}

export function CoreAiChat({
  locale,
  onIntentChange,
}: {
  locale: Locale;
  onIntentChange?: (
    intent: DiscoveryCategory,
    step: DiscoveryStep,
    isProcessing: boolean,
  ) => void;
}) {
  const copy = chatCopy[locale];
  const [messages, setMessages] = useState<DiscoveryMessage[]>(copy.messages);
  const [command, setCommand] = useState("");
  const [step, setStep] = useState<DiscoveryStep>("business");
  const [businessSummary, setBusinessSummary] = useState("");
  const [frictionSummary, setFrictionSummary] = useState("");
  const [category, setCategory] = useState<DiscoveryCategory>("unclear");
  const [leadDraft, setLeadDraft] = useState<LeadDraft>(emptyLeadDraft);
  const [formError, setFormError] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [formStartedAt, setFormStartedAt] = useState(() => Date.now());
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const didMountScrollRef = useRef(false);
  const previousStepRef = useRef<DiscoveryStep>(step);
  const responseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const messageIdRef = useRef(
    Math.max(...copy.messages.map((message) => message.id)) + 1,
  );

  useEffect(() => {
    if (!didMountScrollRef.current) {
      didMountScrollRef.current = true;
      return;
    }

    const animationFrame = requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: step === "contact_form" ? "auto" : "smooth",
      });
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [messages, step, formError, isProcessing, isSubmittingLead]);

  useEffect(() => {
    if (step === "contact_form" && previousStepRef.current !== "contact_form") {
      setFormStartedAt(Date.now());
      setWebsiteUrl("");
    }

    previousStepRef.current = step;
  }, [step]);

  useEffect(() => {
    return () => {
      if (responseTimerRef.current) {
        clearTimeout(responseTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    onIntentChange?.(category, step, isProcessing);
  }, [category, isProcessing, onIntentChange, step]);

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
    const guidedIntent = detectGuidedIntent(trimmedCommand);

    if (isHarmfulIntent(trimmedCommand)) {
      setCategory("unclear");
      if (step !== "completed") {
        setStep("business");
      }
      nextMessages.push(createMessage("agent", copy.harmfulRefusal, "gold"));
      appendMessages(nextMessages);
      return;
    }

    if (isOversizedProductRequest(trimmedCommand)) {
      setBusinessSummary(trimmedCommand);
      setFrictionSummary("Büyük ölçekli ürün vizyonu için MVP keşif");
      setCategory("unclear");
      if (step !== "contact_form" && step !== "completed") {
        setStep("contact_prompt");
      }
      nextMessages.push(createMessage("agent", copy.oversizedVisionReply, "gold"));
      appendMessages(nextMessages);
      return;
    }

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
      nextMessages.push(
        createMessage(
          "agent",
          formatLeadUnderstandingSummary(
            category,
            businessSummary,
            frictionSummary,
            locale,
          ),
          "neon",
        ),
      );
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

      if (guidedIntent) {
        setBusinessSummary(trimmedCommand);
        setCategory(guidedIntent);
        setStep("friction");
        nextMessages.push(createMessage("agent", copy.nextQuestions[guidedIntent], "gold"));
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
        if (
          shouldAskStructuredQuestion(
            trimmedCommand,
            firstClassification.category,
          )
        ) {
          setStep("friction");
          nextMessages.push(
            createMessage(
              "agent",
              copy.nextQuestions[firstClassification.category],
              "gold",
            ),
          );
        } else {
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
        }
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
        nextMessages.push(
          createMessage(
            "agent",
            formatLeadUnderstandingSummary(
              category,
              businessSummary,
              frictionSummary,
              locale,
            ),
            "neon",
          ),
        );
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

  function submitCommand(trimmedCommand: string) {
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitCommand(command.trim());
  }

  function handleQuickIntent(value: string) {
    submitCommand(value);
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

  async function handleLeadSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmittingLead) {
      return;
    }

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
      website: normalizeWebsiteInput(leadDraft.website),
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

    setFormError("");
    setIsSubmittingLead(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nextLead.name,
          email: nextLead.email,
          phone: nextLead.phone,
          company_or_project: nextLead.company_or_project,
          website: nextLead.website,
          preferred_contact_channel: nextLead.preferred_contact_channel,
          note: nextLead.note,
          business_type: nextLead.business_type,
          detected_need: nextLead.detected_need,
          category: nextLead.category,
          source: nextLead.source,
          status: nextLead.status,
          conversation_summary: nextLead.conversation_summary,
          next_action: nextLead.next_action,
          website_url: websiteUrl,
          form_started_at: formStartedAt,
        }),
      });
      const result = (await response.json()) as LeadSubmissionResult;

      if (!response.ok || !result.ok) {
        setFormError(
          result.message ||
            "Form gönderilemedi. Lütfen bilgileri kontrol edip tekrar deneyin.",
        );
        return;
      }

      setStep("completed");
      setLeadDraft(emptyLeadDraft);
      setWebsiteUrl("");
      appendMessages([createMessage("agent", result.message || copy.success, "neon")]);
    } catch {
      setFormError(
        "Form gönderilemedi. Bağlantınızı kontrol edip tekrar deneyebilirsiniz.",
      );
    } finally {
      setIsSubmittingLead(false);
    }
  }

  const placeholder = copy.prompts[step];
  const shouldShowQuickIntents = step === "business" && !isProcessing;

  return (
    <div className="core-chat-shell" aria-label={copy.label}>
      <section className="core-chat-main">
        <div className="core-chat-titlebar">
          <div className="core-chat-title">
            <span className="status-dot" aria-hidden="true" />
            <span>{copy.title}</span>
          </div>
          <span className="core-chat-title-status">{copy.status}</span>
        </div>

        <div className="core-chat-messages" ref={scrollRef}>
          {messages.map((message) => (
            <div
              className={
                message.role === "user"
                  ? "chat-message chat-message-user"
                  : message.id === 1
                    ? "chat-message chat-message-agent chat-message-intro"
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
                {message.id === 1 && message.role === "agent" ? (
                  <span className="chat-message-agent-label">
                    {copy.agentBadge}
                  </span>
                ) : null}
                {message.content}
              </span>
            </div>
          ))}

          {shouldShowQuickIntents ? (
            <div className="core-chat-quick-intents" aria-label={copy.quickIntentLabel}>
              <span>{copy.quickIntentLabel}</span>
              <div>
                {copy.quickIntents.map((intent) => (
                  <button
                    data-intent={intent.category}
                    disabled={isProcessing}
                    key={intent.value}
                    onClick={() => handleQuickIntent(intent.value)}
                    type="button"
                  >
                    <span className="core-chat-quick-icon" aria-hidden="true">
                      <QuickIntentIcon category={intent.category} />
                    </span>
                    <span>{intent.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

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

              <label aria-hidden="true" className="core-chat-honeypot">
                <span>Website URL</span>
                <input
                  autoComplete="off"
                  disabled={isSubmittingLead}
                  name="website_url"
                  onChange={(event) => setWebsiteUrl(event.target.value)}
                  tabIndex={-1}
                  type="text"
                  value={websiteUrl}
                />
              </label>

              <div className="core-chat-form-grid">
                <label>
                  <span>{copy.fields.name}</span>
                  <input
                    autoComplete="name"
                    disabled={isSubmittingLead}
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
                    disabled={isSubmittingLead}
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
                    disabled={isSubmittingLead}
                    onChange={(event) => updateLeadDraft("phone", event.target.value)}
                    type="tel"
                    value={leadDraft.phone}
                  />
                </label>
                <label>
                  <span>{copy.fields.company}</span>
                  <input
                    autoComplete="organization"
                    disabled={isSubmittingLead}
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
                    disabled={isSubmittingLead}
                    onChange={(event) => updateLeadDraft("website", event.target.value)}
                    placeholder={locale === "en" ? "https://example.com" : "Web siteniz varsa"}
                    type="text"
                    value={leadDraft.website}
                  />
                </label>
                <label>
                  <span>{copy.fields.preference}</span>
                  <select
                    disabled={isSubmittingLead}
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
                    disabled={isSubmittingLead}
                    onChange={(event) => updateLeadDraft("note", event.target.value)}
                    rows={3}
                    value={leadDraft.note}
                  />
                </label>
              </div>

              {formError ? <p className="core-chat-form-error">{formError}</p> : null}

              <button
                className="core-chat-submit core-chat-contact-submit"
                disabled={isSubmittingLead}
                type="submit"
              >
                {isSubmittingLead ? "GÖNDERİLİYOR..." : copy.formSubmit}
              </button>
            </form>
          ) : null}
        </div>

        <form className="core-chat-inputbar" onSubmit={handleSubmit}>
          <div className="core-chat-input-wrap">
            <span aria-hidden="true">ai:~$</span>
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

const heroCapabilityCards = {
  tr: [
    {
      icon: "network",
      title: "AI müşteri temsilcisi",
      status: "visitor.greet",
      category: "customer_support_website" as const,
    },
    {
      icon: "database",
      title: "AI satış / teklif asistanı",
      status: "sales.brief",
      category: "sales_quote" as const,
    },
    {
      icon: "workflow",
      title: "AI iş akışı otomasyonu",
      status: "ops.route",
      category: "operations_automation" as const,
    },
    {
      icon: "secure",
      title: "insan onaylı sistem",
      status: "human.review",
      category: "unclear" as const,
    },
  ],
  en: [
    {
      icon: "network",
      title: "AI customer representative",
      status: "visitor.greet",
      category: "customer_support_website" as const,
    },
    {
      icon: "database",
      title: "AI sales / proposal assistant",
      status: "sales.brief",
      category: "sales_quote" as const,
    },
    {
      icon: "workflow",
      title: "AI workflow automation",
      status: "ops.route",
      category: "operations_automation" as const,
    },
    {
      icon: "secure",
      title: "human-approved system",
      status: "human.review",
      category: "unclear" as const,
    },
  ],
} satisfies Record<
  Locale,
  {
    icon: string;
    title: string;
    status: string;
    category: DiscoveryCategory;
  }[]
>;

function getHeroCapabilityState(
  category: DiscoveryCategory,
  activeIntent: DiscoveryCategory,
  agentStep: DiscoveryStep,
) {
  if (category === "unclear") {
    if (
      agentStep === "contact_prompt" ||
      agentStep === "contact_form" ||
      agentStep === "completed"
    ) {
      return "enabled";
    }

    return "enabled";
  }

  if (activeIntent === category) {
    return "active";
  }

  if (category === "sales_quote") {
    return "ready";
  }

  if (category === "operations_automation") {
    return "online";
  }

  return "ready";
}

function QuickIntentIcon({ category }: { category: DiscoveryCategory }) {
  if (category === "sales_quote") {
    return <CapabilityIcon type="database" />;
  }

  if (category === "operations_automation") {
    return <CapabilityIcon type="workflow" />;
  }

  if (category === "unclear") {
    return <CapabilityIcon type="secure" />;
  }

  return <CapabilityIcon type="network" />;
}

function CapabilityIcon({ type }: { type: string }) {
  if (type === "network") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M32 7 43 13v13l-11 7-11-7V13l11-6Z" />
        <path d="M14 33 25 39v13l-11 7-11-7V39l11-6Z" />
        <path d="M50 33 61 39v13l-11 7-11-7V39l11-6Z" />
        <path d="M24 28 17 35" />
        <path d="M40 28 47 35" />
      </svg>
    );
  }

  if (type === "database") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <ellipse cx="32" cy="14" rx="22" ry="8" />
        <path d="M10 14v12c0 4 10 8 22 8s22-4 22-8V14" />
        <path d="M10 26v12c0 4 10 8 22 8s22-4 22-8V26" />
        <path d="M10 38v12c0 4 10 8 22 8s22-4 22-8V38" />
      </svg>
    );
  }

  if (type === "workflow") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M25 8h14v10H25z" />
        <path d="M8 46h14v10H8z" />
        <path d="M25 46h14v10H25z" />
        <path d="M42 46h14v10H42z" />
        <path d="M32 18v12" />
        <path d="M15 46V34h34v12" />
        <path d="M32 34v12" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 5 52 14v17c0 14-8 24-20 29C20 55 12 45 12 31V14l20-9Z" />
      <path d="M24 33h16v14H24z" />
      <path d="M27 33v-6a5 5 0 0 1 10 0v6" />
      <path d="M32 39v4" />
    </svg>
  );
}

export function HeroAgentExperience({
  locale,
  capabilityLabel,
}: {
  locale: Locale;
  capabilityLabel: string;
}) {
  const [activeIntent, setActiveIntent] =
    useState<DiscoveryCategory>("customer_support_website");
  const [agentStep, setAgentStep] = useState<DiscoveryStep>("business");
  const [isAgentProcessing, setIsAgentProcessing] = useState(false);
  const cards = heroCapabilityCards[locale];
  const processCopy = chatCopy[locale];
  const processStates = getAgentProcessStates(agentStep, isAgentProcessing);
  const processEntries = Object.entries(processCopy.processSteps) as [
    AgentProcessKey,
    ProcessStepCopy,
  ][];

  function handleIntentChange(
    intent: DiscoveryCategory,
    nextStep: DiscoveryStep,
    nextIsProcessing: boolean,
  ) {
    setAgentStep(nextStep);
    setIsAgentProcessing(nextIsProcessing);

    if (intent !== "unclear") {
      setActiveIntent(intent);
    }
  }

  return (
    <div className="hero-system-stage" data-active-intent={activeIntent} data-agent-step={agentStep}>
      <div className="hero-link-field" aria-hidden="true">
        <span className="hero-link-line hero-link-line-one" />
        <span className="hero-link-line hero-link-line-two" />
        <span className="hero-link-line hero-link-line-three" />
        <span className="hero-link-line hero-link-line-four" />
      </div>
      <div className="hero-assistant-stack">
        <div className="hero-assistant-console">
          <span className="hero-console-scanline" aria-hidden="true" />
          <CoreAiChat locale={locale} onIntentChange={handleIntentChange} />
        </div>
        <div className="hero-agent-process-panel" aria-label={processCopy.processLabel}>
          <span className="hero-agent-process-title">
            {locale === "en" ? "ASSISTANT PROCESS" : "ASİSTAN SÜRECİ"}
          </span>
          <div className="hero-agent-process-steps">
            {processEntries.map(([key, stepCopy]) => (
              <div
                className="hero-agent-process-step"
                data-state={processStates[key]}
                key={key}
              >
                <span className="hero-agent-process-node" aria-hidden="true">
                  <QuickIntentIcon
                    category={
                      key === "solution.map"
                        ? activeIntent
                        : key === "human.review"
                          ? "unclear"
                          : "customer_support_website"
                    }
                  />
                </span>
                <strong>{stepCopy.label}</strong>
                <span>{stepCopy.detail}</span>
                <em>{processStates[key]}</em>
              </div>
            ))}
          </div>
        </div>
      </div>
      <aside className="hero-capability-rail" aria-label={capabilityLabel}>
        {cards.map((card) => {
          const cardState = getHeroCapabilityState(
            card.category,
            activeIntent,
            agentStep,
          );

          return (
            <div
              className="hero-capability-card"
              data-active={cardState === "active"}
              data-state={cardState}
              key={card.title}
            >
              <span className="hero-capability-icon">
                <CapabilityIcon type={card.icon} />
              </span>
              <strong>{card.title}</strong>
              <span>{card.status}</span>
              <em>{cardState}</em>
            </div>
          );
        })}
      </aside>
    </div>
  );
}
