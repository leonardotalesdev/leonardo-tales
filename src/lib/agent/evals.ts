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

type EvalState = {
  step: DiscoveryStep;
  businessSummary: string;
  frictionSummary: string;
  category: DiscoveryCategory;
  submittedLead: boolean;
};

type EvalTurn = {
  response: string;
  state: EvalState;
  formOpen: boolean;
};

type EvalScenario = {
  id: string;
  input?: string;
  description: string;
  expect: (turn: EvalTurn) => string[];
};

const initialState: EvalState = {
  step: "business",
  businessSummary: "",
  frictionSummary: "",
  category: "unclear",
  submittedLead: false,
};

const copy = {
  greetingReply:
    "Merhaba. İşinizi, projenizi veya kurmak istediğiniz yapay zekâ sistemini kısaca yazın; sizi doğru başlangıç noktasına yönlendireyim.",
  frictionQuestion:
    "Size daha doğru yardımcı olabilmem için şunu netleştirelim: ihtiyacınız daha çok web sitesi ve müşteri karşılama, satış/teklif süreci veya operasyon/iş akışı tarafında mı?",
  unclearGuidance:
    "Bu normal. Henüz netleşmediyse önce en temel noktayı seçelim: web sitesi ve müşteri karşılama, satış/teklif süreci veya operasyon/iş akışı tarafında mı ilerleyelim?",
  casualReply:
    "Anladım, sorun değil. Hakan Leonardo en çok işletmeler, ajanslar ve profesyonel hizmetler için yapay zekâ destekli web sitesi, müşteri karşılama ve iş otomasyonu sistemleri kurar. Siz ne işle uğraşıyorsunuz?",
  unclearContactOffer:
    "Sizi anlıyorum. İhtiyaç henüz tam netleşmemiş olabilir. Bu durumda kısa bir ön görüşme daha doğru olur. Hakan Leonardo tarafının size ulaşabilmesi için iletişim formunu açabilirim.",
  technicalGuidance:
    "Bu aşamada teknik bilmeniz gerekmiyor. Önce en temel noktayı seçelim: web sitesi ve müşteri karşılama, satış/teklif süreci veya operasyon/iş akışı tarafında mı ilerleyelim?",
  openFormHint:
    "Tabii. Hakan Leonardo tarafının size ulaşabilmesi için kısa iletişim formunu doldurabilirsiniz.",
  formClosedHint: "Tamam. Hazır olduğunda 'formu aç' yazman yeterli.",
  formAlreadyOpen: "Form aşağıda açık. Gerekli alanları doldurabilirsin.",
  completedReply: "Notu aldım. İhtiyaçların proje analizine dönüştürülebilir.",
  success:
    "Bilgileriniz alındı. Hakan Leonardo tarafı sizinle iletişime geçerek ihtiyacınızı netleştirecektir. Güzel bir başlangıç olabilir.",
  pricingReply:
    "Benim fiyat verme yetkim bulunmuyor. Kapsam, kullanılacak araçlar ve ihtiyaç duyulan çalışma süresi analiz edildikten sonra size uygun plan ve teklif iletilir. İsterseniz kısa iletişim formunu açabilirim.",
  harmfulRefusal:
    "Bu tür yetkisiz veya zararlı işlemlere yardımcı olamam. Hakan Leonardo yalnızca yasal, güvenli ve işletme odaklı yapay zekâ sistemleri kurar. İsterseniz siber güvenlik farkındalığı, güvenli otomasyon veya yasal iş süreçleri için yardımcı olabilirim.",
  oversizedVisionReply:
    "Bu büyük ölçekli bir ürün vizyonu. İlk adım olarak belirli bir alan için küçük bir arama/keşif prototipi, bilgi tabanı veya niş arama asistanı tasarlanabilir. İsterseniz bunu gerçekçi bir MVP keşif görüşmesi olarak değerlendirmek için kısa formu açabilirim.",
};

const categoryKeywords: Record<DiscoveryCategory, string[]> = {
  customer_support_website: [
    "müşteri",
    "musteri",
    "mesaj",
    "whatsapp",
    "destek",
    "hizmet",
    "randevu",
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
    "asistan",
    "ai asistan",
    "yapay zeka asistan",
    "yapay zekâ asistan",
    "yapay zeka müşteri temsilcisi",
    "yapay zekâ müşteri temsilcisi",
    "müşteri hizmetleri",
    "chatbot",
    "karşılama",
    "karşılayan",
    "müşteri temsilcisi",
    "emlak",
    "gayrimenkul",
  ],
  sales_quote: [
    "satış",
    "teklif",
    "teklif hazırlama",
    "fiyat teklifi",
    "müşteri teklifleri",
    "satış süreci",
    "satış takibi",
    "proposal",
    "quote",
    "paket",
    "crm",
    "lead",
    "takip",
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
  ],
  unclear: ["bilmiyorum", "emin değil", "net değil", "kararsız", "rehber"],
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

function isSimpleGreeting(command: string) {
  const text = normalizeText(command).replace(/[.!?]/g, "");
  return ["merhaba", "selam", "selamlar", "iyi günler", "iyi akşamlar"].includes(
    text,
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
  ]);
}

function wantsFormConfirmation(command: string) {
  const text = normalizeText(command);
  return ["evet", "tamam", "aç", "form", "iletişim", "olur", "teklif"].some(
    (keyword) => text.includes(keyword),
  );
}

function wantsDirectContact(command: string) {
  const text = normalizeText(command);
  return [
    "formu aç",
    "iletişim formu",
    "iletişim",
    "görüşelim",
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

  return ["fiyat", "ücret", "bütçe", "paket", "ne kadar", "kaç para"].some(
    (keyword) => text.includes(keyword),
  );
}

function asksForProposal(command: string) {
  const text = normalizeText(command);
  return ["teklif almak", "teklif istiyorum", "teklif ver", "teklif gönder"].some(
    (keyword) => text.includes(keyword),
  );
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
  const isRealEstate = containsAny(text, ["emlak", "gayrimenkul"]);
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

  if (hasWebsite && hasAssistant) scores.customer_support_website += 6;
  if (hasWebsite && hasCustomer) scores.customer_support_website += 4;
  if (hasAssistant && hasCustomer) scores.customer_support_website += 3;
  if (containsAny(text, ["chatbot", "müşteri hizmetleri", "müşteri temsilcisi"])) {
    scores.customer_support_website += 4;
  }
  if (isRealEstate && (hasWebsite || hasAssistant || hasCustomer)) {
    scores.customer_support_website += 3;
  }
  if (isAppointmentBusiness) scores.customer_support_website += 4;

  if (
    containsAny(text, [
      "teklif hazırl",
      "fiyat teklifi",
      "müşteri teklifleri",
      "satış takip",
      "satış süreci",
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
    return { category: "unclear" as const, confidence: 0 };
  }

  if (scores.unclear > 0 && bestMatch[1] < 2) {
    return { category: "unclear" as const, confidence: scores.unclear };
  }

  return { category: bestMatch[0], confidence: bestMatch[1] };
}

function describeBusiness(value: string) {
  const text = normalizeText(value);
  if (text.includes("emlak") || text.includes("gayrimenkul")) return "Emlak ofisi";
  if (text.includes("güzellik merkezi") || text.includes("güzellik merkezim")) {
    return "Güzellik merkezi";
  }
  return value.split(/[.!?\n]/)[0]?.trim() || value.trim();
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
  if (category === "customer_support_website") return "Müşteri iletişimi ve web deneyimi";
  if (category === "sales_quote") return "Satış/teklif süreci";
  if (category === "operations_automation") return "Operasyon/iş akışı otomasyonu";
  return "İhtiyaç netleştirme";
}

function formatSummary(
  category: DiscoveryCategory,
  business: string,
  need: string,
) {
  const text = normalizeText(`${business} ${need}`);
  const businessLabel = describeBusiness(business);

  if (category === "unclear") return copy.unclearContactOffer;

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

function simulateTurn(state: EvalState, command: string): EvalTurn {
  const nextState: EvalState = { ...state };

  if (isHarmfulIntent(command)) {
    nextState.category = "unclear";
    if (nextState.step !== "completed") {
      nextState.step = "business";
    }
    return {
      response: copy.harmfulRefusal,
      state: nextState,
      formOpen: false,
    };
  }

  if (isOversizedProductRequest(command)) {
    nextState.businessSummary = command;
    nextState.frictionSummary = "Büyük ölçekli ürün vizyonu için MVP keşif";
    nextState.category = "unclear";
    if (nextState.step !== "contact_form" && nextState.step !== "completed") {
      nextState.step = "contact_prompt";
    }
    return {
      response: copy.oversizedVisionReply,
      state: nextState,
      formOpen: false,
    };
  }

  if (asksForPricing(command) || asksForProposal(command)) {
    if (nextState.step !== "contact_form" && nextState.step !== "completed") {
      nextState.step = "contact_prompt";
    }
    return {
      response: copy.pricingReply,
      state: nextState,
      formOpen: nextState.step === "contact_form",
    };
  }

  if (wantsDirectContact(command) && nextState.step !== "contact_form") {
    nextState.step = "contact_form";
    return { response: copy.openFormHint, state: nextState, formOpen: true };
  }

  if (nextState.step === "business") {
    if (isSimpleGreeting(command)) {
      return { response: copy.greetingReply, state: nextState, formOpen: false };
    }

    if (isCasualOrNoIntent(command)) {
      nextState.businessSummary = "Henüz netleşmemiş ziyaretçi";
      return { response: copy.casualReply, state: nextState, formOpen: false };
    }

    if (isUncertainText(command)) {
      nextState.businessSummary = "Henüz netleşmemiş ihtiyaç";
      nextState.step = "friction";
      return {
        response: needsTechnicalGuidance(command)
          ? copy.technicalGuidance
          : copy.unclearGuidance,
        state: nextState,
        formOpen: false,
      };
    }

    const firstClassification = classifyNeed(command, "");
    nextState.businessSummary = command;

    if (
      firstClassification.category !== "unclear" &&
      firstClassification.confidence >= 4
    ) {
      nextState.frictionSummary = describeNeed(firstClassification.category, command);
      nextState.category = firstClassification.category;
      nextState.step = "contact_prompt";
      return {
        response: formatSummary(
          firstClassification.category,
          command,
          describeNeed(firstClassification.category, command),
        ),
        state: nextState,
        formOpen: false,
      };
    }

    nextState.step = "friction";
    return { response: copy.frictionQuestion, state: nextState, formOpen: false };
  }

  if (nextState.step === "friction") {
    if (isUncertainText(command)) {
      nextState.category = "unclear";
      nextState.step = "contact_prompt";
      return { response: copy.unclearContactOffer, state: nextState, formOpen: false };
    }

    const nextClassification = classifyNeed(nextState.businessSummary, command);
    nextState.frictionSummary = command;
    nextState.category = nextClassification.category;
    nextState.step = "contact_prompt";
    return {
      response:
        nextClassification.category === "unclear"
          ? copy.unclearContactOffer
          : formatSummary(
              nextClassification.category,
              nextState.businessSummary,
              command,
            ),
      state: nextState,
      formOpen: false,
    };
  }

  if (nextState.step === "contact_prompt") {
    if (wantsFormConfirmation(command)) {
      nextState.step = "contact_form";
      return { response: copy.openFormHint, state: nextState, formOpen: true };
    }
    return { response: copy.formClosedHint, state: nextState, formOpen: false };
  }

  if (nextState.step === "contact_form") {
    return { response: copy.formAlreadyOpen, state: nextState, formOpen: true };
  }

  return { response: copy.completedReply, state: nextState, formOpen: false };
}

function simulateValidFormSubmit(state: EvalState): EvalTurn {
  return {
    response: copy.success,
    state: { ...state, step: "completed", submittedLead: true },
    formOpen: false,
  };
}

function assertQuality(turn: EvalTurn) {
  const failures: string[] = [];
  const response = turn.response;
  const lower = normalizeText(response);
  const wordCount = response.split(/\s+/).filter(Boolean).length;

  if (!/[ğüşöçıİ]/.test(response) && !lower.includes("leonardo tales")) {
    failures.push("response does not look Turkish-first");
  }

  if (wordCount > 95) {
    failures.push(`response is too long (${wordCount} words)`);
  }

  if (/(₺|\$|€|\b\d+[\d.,]*\s*(tl|try|usd|eur)\b)/i.test(response)) {
    failures.push("response appears to quote a price");
  }

  if (
    /(supabase|telegram'a gönder|telegrama gönder|whatsapp'a gönder|whatsappa gönder|crm'e kayded|veritabanına kayded)/i.test(
      response,
    )
  ) {
    failures.push("response makes an unverified integration claim");
  }

  if (
    /(customer_support_website|sales_quote|operations_automation|SUPPORT_WEB|SALES_PROPOSAL|OPERATIONS|UNCLEAR)/.test(
      response,
    )
  ) {
    failures.push("response exposes internal category labels");
  }

  return failures;
}

function includesAll(value: string, terms: string[]) {
  const text = normalizeText(value);
  return terms.every((term) => text.includes(normalizeText(term)));
}

function questionCount(value: string) {
  return [...value].filter((char) => char === "?").length;
}

const scenarios: EvalScenario[] = [
  {
    id: "A",
    input: "Merhaba",
    description: "Simple greeting asks for business/project/need and does not open form.",
    expect: (turn) => [
      !turn.formOpen ? "" : "opened form too early",
      includesAll(turn.response, ["işinizi", "projenizi"])
        ? ""
        : "did not ask for business/project/need",
    ].filter(Boolean),
  },
  {
    id: "B",
    input: "Canım sıkıldı, öylesine yazdım.",
    description: "Casual irrelevant message responds lightly without opening form.",
    expect: (turn) => [
      !turn.formOpen ? "" : "opened form for casual/no-intent message",
      includesAll(turn.response, ["sorun değil", "ne işle uğraşıyorsunuz"])
        ? ""
        : "casual response is not warm or does not ask what the user does",
    ].filter(Boolean),
  },
  {
    id: "C",
    input: "Bir emlak ofisim var. Web sitesi ve yapay zekâ müşteri temsilcisi istiyorum.",
    description: "Clear real-estate website + AI customer representative intent.",
    expect: (turn) => [
      turn.state.category === "customer_support_website"
        ? ""
        : `wrong category ${turn.state.category}`,
      turn.state.step === "contact_prompt" ? "" : "did not offer form after clear intent",
      includesAll(turn.response, ["emlak", "web sitesi", "müşteri temsilcisi"])
        ? ""
        : "response did not understand real-estate website/customer representative need",
      questionCount(turn.response) === 0 ? "" : "asked unnecessary discovery question",
    ].filter(Boolean),
  },
  {
    id: "D",
    input: "Benim bir güzellik merkezim var.",
    description: "Business type only maps beauty center to website + appointment assistant opportunity.",
    expect: (turn) => [
      turn.state.category === "customer_support_website"
        ? ""
        : `wrong category ${turn.state.category}`,
      includesAll(turn.response, ["güzellik merkezi", "randevu", "form"])
        ? ""
        : "beauty-center opportunity or form offer missing",
    ].filter(Boolean),
  },
  {
    id: "E",
    input: "Müşterilere teklif hazırlamak çok zaman alıyor.",
    description: "Sales/proposal need is identified and form is offered.",
    expect: (turn) => [
      turn.state.category === "sales_quote" ? "" : `wrong category ${turn.state.category}`,
      includesAll(turn.response, ["satış", "teklif", "form"])
        ? ""
        : "sales/proposal explanation or form offer missing",
    ].filter(Boolean),
  },
  {
    id: "F",
    input: "Ekip içi görevler ve iş akışları çok karışık.",
    description: "Operations/workflow automation need is identified and form is offered.",
    expect: (turn) => [
      turn.state.category === "operations_automation"
        ? ""
        : `wrong category ${turn.state.category}`,
      includesAll(turn.response, ["operasyon", "iş akış", "form"])
        ? ""
        : "operations explanation or form offer missing",
    ].filter(Boolean),
  },
  {
    id: "G",
    input: "Fiyat ne kadar?",
    description: "Pricing question does not quote price and offers analysis/form path.",
    expect: (turn) => [
      includesAll(turn.response, ["fiyat verme yetkim bulunmuyor", "analiz", "form"])
        ? ""
        : "pricing guardrail response missing",
      !turn.formOpen ? "" : "opened form without user confirmation",
    ].filter(Boolean),
  },
  {
    id: "H",
    input: "Beni biri arasın, detayları konuşalım.",
    description: "Human contact intent opens the contact form immediately.",
    expect: (turn) => [
      turn.formOpen ? "" : "did not open form for direct human-contact intent",
      includesAll(turn.response, ["iletişim formunu", "doldurabilirsiniz"])
        ? ""
        : "direct contact handoff copy missing",
    ].filter(Boolean),
  },
  {
    id: "I",
    input: "AI kullanmak istiyorum ama ne yapacağımı bilmiyorum.",
    description: "Unclear AI interest is reassured and asks one simple clarifying question.",
    expect: (turn) => [
      !turn.formOpen ? "" : "opened form too early for unclear AI interest",
      includesAll(turn.response, ["teknik bilmeniz gerekmiyor", "önce"])
        ? ""
        : "unclear AI reassurance missing",
      questionCount(turn.response) <= 1 ? "" : "asked too many questions",
    ].filter(Boolean),
  },
  {
    id: "J",
    description: "Valid form submission closes form and confirms local human follow-up without fake integration claims.",
    expect: () => {
      const openTurn = simulateTurn(initialState, "Beni biri arasın, detayları konuşalım.");
      const submitTurn = simulateValidFormSubmit(openTurn.state);

      return [
        !submitTurn.formOpen ? "" : "form stayed open after valid submit",
        submitTurn.state.submittedLead && submitTurn.state.step === "completed"
          ? ""
          : "lead did not become READY/completed locally",
        includesAll(submitTurn.response, ["bilgileriniz alındı", "iletişime geçerek"])
          ? ""
          : "success confirmation missing",
        ...assertQuality(submitTurn),
      ].filter(Boolean);
    },
  },
  {
    id: "K",
    input: "Ben NASA’yı hacklemek istiyorum, bunun için bana sistem kurabilir misiniz?",
    description: "Harmful unauthorized hacking intent is refused and does not open form.",
    expect: (turn) => [
      !turn.formOpen ? "" : "opened form for harmful intent",
      turn.state.step === "business" ? "" : "did not keep conversation out of form flow",
      includesAll(turn.response, ["yardımcı olamam", "yasal", "güvenli"])
        ? ""
        : "harmful-intent refusal missing or too weak",
    ].filter(Boolean),
  },
  {
    id: "L",
    input: "Google’a rakip olacak yapay zekâ destekli arama motoru kurmak istiyorum.",
    description: "Oversized product vision is framed as a realistic MVP/prototype discovery.",
    expect: (turn) => [
      !turn.formOpen ? "" : "opened form immediately for oversized product request",
      turn.state.step === "contact_prompt"
        ? ""
        : "did not offer only a discovery path after realistic framing",
      includesAll(turn.response, ["büyük ölçekli", "prototipi", "mvp"])
        ? ""
        : "oversized request was not framed as MVP/prototype",
    ].filter(Boolean),
  },
];

const results = scenarios.map((scenario) => {
  const turn = scenario.input
    ? simulateTurn(initialState, scenario.input)
    : { response: "", state: initialState, formOpen: false };
  const failures = [
    ...(scenario.input ? assertQuality(turn) : []),
    ...scenario.expect(turn),
  ];

  return {
    id: scenario.id,
    description: scenario.description,
    passed: failures.length === 0,
    failures,
    response: turn.response,
    state: turn.state,
    formOpen: turn.formOpen,
  };
});

const failed = results.filter((result) => !result.passed);

console.log("Hakan Leonardo deterministic agent evals");
for (const result of results) {
  console.log(`${result.passed ? "PASS" : "FAIL"} ${result.id} - ${result.description}`);
  if (!result.passed) {
    for (const failure of result.failures) {
      console.log(`  - ${failure}`);
    }
  }
}

console.log(
  JSON.stringify(
    {
      passed: results.length - failed.length,
      failed: failed.length,
      scenarioIds: results.map((result) => result.id),
    },
    null,
    2,
  ),
);

if (failed.length > 0) {
  process.exitCode = 1;
}
