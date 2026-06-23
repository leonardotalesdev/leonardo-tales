import Image from "next/image";

import { CoreAiChat } from "@/components/CoreAiChat";

type Locale = "tr" | "en";

const infrastructureCards = [
  {
    number: "[01]",
    symbol: "<AI/>",
    title: "AI Müşteri Temsilcisi",
    description: "Web sitesinde ziyaretçiyi karşılayan, ihtiyacı anlayan ve lead toplayan sistemler.",
    logs: ["visitor.greet", "need.detect", "lead.capture"],
    image: "/images/infrastructure/multi-agent-frameworks.png",
  },
  {
    number: "[02]",
    symbol: "{CRM}",
    title: "AI Satış ve Teklif Asistanı",
    description:
      "Müşteri ihtiyacını düzenleyen, satış ekibine net özet ve teklif hazırlığı sağlayan akışlar.",
    logs: ["sales.brief", "quote.ready", "followup.map"],
    image: "/images/infrastructure/smart-integrations.png",
  },
  {
    number: "[03]",
    symbol: "[OPS]",
    title: "AI Operasyon Otomasyonu",
    description:
      "Tekrar eden işleri, formları, görevleri ve rapor akışlarını daha düzenli hale getiren otomasyonlar.",
    logs: ["task.route", "form.sync", "report.loop"],
    image: "/images/infrastructure/edge-scale-infrastructure.png",
  },
  {
    number: "[04]",
    symbol: "/QA",
    title: "Güvenli İş Akışı",
    description:
      "Kapsamı net, insan onaylı ve ölçülebilir yapay zekâ iş akışları.",
    logs: ["scope.lock", "human.review", "risk.check"],
    image: "/images/infrastructure/self-healing-automation.png",
  },
];

const heroTelemetry = [
  ["HİZMET", "03 HAT"],
  ["LEAD", "FORM HAZIR"],
  ["TAKİP", "İNSAN ONAYLI"],
  ["ASİSTAN", "DİNLİYOR"],
];

const infrastructureShowcaseCards = [
  {
    icon: "network",
    title: "AI Müşteri Temsilcisi",
    description: "Ziyaretçiyi karşılayan, ihtiyacı anlayan ve iletişim bilgisini doğru anda alan sistemler.",
  },
  {
    icon: "database",
    title: "AI Satış ve Teklif",
    description: "Satış görüşmelerini, teklif taleplerini ve müşteri özetlerini daha düzenli hale getiren akışlar.",
  },
  {
    icon: "workflow",
    title: "İş Akışı Otomasyonu",
    description: "Tekrar eden görevleri, form akışlarını ve operasyon takiplerini sadeleştiren otomasyonlar.",
  },
  {
    icon: "secure",
    title: "Güvenli ve Ölçeklenebilir",
    description: "Güvenli, ölçeklenebilir ve dayanıklı altyapı mimarileri.",
  },
  {
    icon: "terminal",
    title: "Gözlemlenebilirlik",
    description: "Sistemlerinizi izler, analiz eder ve optimize eden gözlemlenebilirlik.",
  },
  {
    icon: "api",
    title: "Araç ve Entegrasyonlar",
    description: "Mevcut iş araçlarıyla kontrollü, doğrulanabilir ve ihtiyaca göre planlanan bağlantılar.",
  },
];

const howItWorksCards = [
  {
    number: "01",
    title: "İhtiyaç Analizi",
    description:
      "İşinizi, müşteri temas noktalarınızı ve önce iyileştirilmesi gereken süreci netleştiririz.",
  },
  {
    number: "02",
    title: "Sistem Tasarımı",
    description:
      "AI temsilci, satış asistanı veya operasyon otomasyonu için sade ve uygulanabilir akış çıkarırız.",
  },
  {
    number: "03",
    title: "Kurulum ve Test",
    description:
      "Web, form, bildirim ve takip akışlarını kontrollü şekilde kurup test ederiz.",
  },
  {
    number: "04",
    title: "İnsan Onaylı İyileştirme",
    description:
      "Sistem çıktıları insan ekibine temiz veriyle taşınır; iyileştirme kararları ölçülebilir kalır.",
  },
];

const englishInfrastructureCards = [
  {
    number: "[01]",
    symbol: "<AI/>",
    title: "AI Customer Representative",
    description: "Systems that greet website visitors, understand the need, and capture leads.",
    logs: ["visitor.greet", "need.detect", "lead.capture"],
    image: "/images/infrastructure/multi-agent-frameworks.png",
  },
  {
    number: "[02]",
    symbol: "{CRM}",
    title: "AI Sales and Proposal Assistant",
    description:
      "Flows that organize customer needs and prepare clearer briefs for sales and proposals.",
    logs: ["sales.brief", "quote.ready", "followup.map"],
    image: "/images/infrastructure/smart-integrations.png",
  },
  {
    number: "[03]",
    symbol: "[OPS]",
    title: "AI Operations Automation",
    description:
      "Automations that organize recurring work, forms, tasks, and reporting flows.",
    logs: ["task.route", "form.sync", "report.loop"],
    image: "/images/infrastructure/edge-scale-infrastructure.png",
  },
  {
    number: "[04]",
    symbol: "/QA",
    title: "Controlled Business Flow",
    description: "Scoped, human-reviewed, and measurable AI workflows for practical business use.",
    logs: ["scope.lock", "human.review", "risk.check"],
    image: "/images/infrastructure/self-healing-automation.png",
  },
];

const englishHeroTelemetry = [
  ["SERVICES", "03 LINES"],
  ["LEAD", "FORM READY"],
  ["FOLLOW-UP", "HUMAN REVIEW"],
  ["ASSISTANT", "LISTENING"],
];

const englishInfrastructureShowcaseCards = [
  {
    icon: "network",
    title: "AI Customer Representative",
    description: "Systems that greet visitors, understand needs, and collect contact details at the right moment.",
  },
  {
    icon: "database",
    title: "AI Sales and Proposals",
    description: "Flows that organize sales conversations, proposal requests, and customer summaries.",
  },
  {
    icon: "workflow",
    title: "Workflow Automation",
    description: "Automations that simplify recurring tasks, form flows, and operational tracking.",
  },
  {
    icon: "secure",
    title: "Secure and Scalable",
    description: "Secure, scalable, and resilient infrastructure architectures.",
  },
  {
    icon: "terminal",
    title: "Observability",
    description: "Observability systems that monitor, analyze, and optimize operations.",
  },
  {
    icon: "api",
    title: "Tools and Integrations",
    description: "Controlled, verifiable connections with existing business tools when the scope requires it.",
  },
];

const englishHowItWorksCards = [
  {
    number: "01",
    title: "Need analysis",
    description:
      "We clarify your business, customer touchpoints, and which process should improve first.",
  },
  {
    number: "02",
    title: "System design",
    description:
      "We design a simple and applicable flow for the AI representative, sales assistant, or operations automation.",
  },
  {
    number: "03",
    title: "Setup and testing",
    description:
      "We set up and test the web, form, notification, and follow-up flows in a controlled way.",
  },
  {
    number: "04",
    title: "Human-reviewed follow-up",
    description:
      "System outputs move to the human team as clean data, while improvement decisions stay measurable.",
  },
];

const homeCopy = {
  tr: {
    navLabel: "Birincil gezinme",
    navInfrastructure: "/sistemler",
    langHref: "/en",
    langLabel: "EN",
    headerCta: "ASİSTANI_BAŞLAT",
    kicker: "// İŞLETMELER İÇİN YAPAY ZEKÂ SİSTEMLERİ",
    title: "AI müşteri temsilcisi, satış asistanı ve operasyon otomasyonu.",
    description:
      "Hakan Leonardo, işletmeniz için web sitesiyle çalışan AI müşteri temsilcisi, satış/teklif asistanı ve operasyon otomasyonu akışları tasarlar. İlk adım: ihtiyacı netleştiren kısa bir keşif görüşmesi.",
    primaryCta: "ASİSTANI_BAŞLAT",
    visionCta: "SİSTEMLERİ_GÖR",
    terminalLabel: "Ajan başlangıç terminali",
    telemetryLabel: "Giriş sistem telemetrisi",
    visionText:
      "Web siteleri, müşteri temsilcileri, satış akışları ve operasyonel süreçler artık yalnızca statik araçlar olmak zorunda değildir. Doğru kurulan yapay zekâ sistemleri; müşteriyi karşılayan, ihtiyacı anlayan, bilgiyi düzenleyen, işi sınıflandıran ve insan ekibine daha temiz bir akış teslim eden yeni bir iş katmanı oluşturur.",
    principle:
      "Teknoloji, insan emeğinin yerini almak için değil; onu daha bilinçli, ölçülebilir ve etkili hale getirmek için tasarlanmalıdır.",
    infrastructureShowcaseTitle: "Kurulan İş Sistemleri",
    howItWorksTitle: "Nasıl Çalışır",
    howItWorksDescription:
      "Hakan Leonardo, yapay zekâ sistemlerini tek seferlik araçlar gibi değil; analiz edilen, kurulan, test edilen ve insan onayıyla iyileştirilen iş akışları olarak tasarlar.",
    infrastructureTitle: "Hizmet Hatları ve Yetkinlikler",
    infrastructureDescription:
      "AI müşteri temsilcisi, satış/teklif asistanı ve operasyon otomasyonu için kontrollü, ölçülebilir ve iş odaklı yetkinlik matrisi.",
    imageAltSuffix: "görseli",
    coreIndex: "[AI_KEŞİF_ARAYÜZÜ]",
    coreTitle: "Yapay Zekâ Keşif Asistanı",
    coreSubtitle: "İş ihtiyacınızı yazın; doğru başlangıç noktasını netleştirelim.",
    footerTitle: "Geleceği İnşa Etmeye Hazır mısınız?",
    footerText:
      "İşinizi anlatın, doğru yapay zekâ başlangıç noktasını netleştirelim.",
    footerCta: "KEŞİF_GÖRÜŞMESİNİ_BAŞLAT",
    footerCopyright: "© 2026 Hakan Leonardo. Tüm sistemler operasyonel.",
    footerNavLabel: "Alt gezinme",
    footerCore: "/asistan",
    chat: "tr" as const,
  },
  en: {
    navLabel: "Primary navigation",
    navInfrastructure: "/systems",
    langHref: "/",
    langLabel: "TR",
    headerCta: "START_ASSISTANT",
    kicker: "// AI SYSTEMS FOR PRACTICAL BUSINESS WORKFLOWS",
    title: "AI customer representative, sales assistant, and operations automation.",
    description:
      "Hakan Leonardo designs AI customer representatives, sales/proposal assistants, and operations automation flows for businesses. The first step is a short discovery conversation that clarifies the need.",
    primaryCta: "START_ASSISTANT",
    visionCta: "VIEW_SYSTEMS",
    terminalLabel: "Agent boot terminal",
    telemetryLabel: "Entry system telemetry",
    visionText:
      "Websites, customer representatives, sales flows, and operational processes no longer have to remain static tools. Properly built AI systems create a new business layer that greets customers, understands needs, organizes information, classifies work, and delivers a cleaner flow to the human team.",
    principle:
      "Technology should be designed not to replace human labor, but to make it more conscious, measurable, and effective.",
    infrastructureShowcaseTitle: "Business Systems We Build",
    howItWorksTitle: "How It Works",
    howItWorksDescription:
      "Hakan Leonardo designs AI systems not as one-off tools, but as workflows that are analyzed, installed, tested, and improved with human approval.",
    infrastructureTitle: "Service Lines and Capabilities",
    infrastructureDescription:
      "A practical capability matrix for AI customer representatives, sales/proposal assistants, and operations automation.",
    imageAltSuffix: "visual",
    coreIndex: "[AI_DISCOVERY_INTERFACE]",
    coreTitle: "AI Discovery Assistant",
    coreSubtitle: "Describe the business need; let’s clarify the right starting point.",
    footerTitle: "Ready to Build the Future?",
    footerText:
      "Describe your business and let’s clarify the right AI starting point.",
    footerCta: "START_DISCOVERY",
    footerCopyright: "© 2026 Hakan Leonardo. All systems operational.",
    footerNavLabel: "Footer navigation",
    footerCore: "/assistant",
    chat: "en" as const,
  },
};

function InfrastructureIcon({ type }: { type: string }) {
  if (type === "network") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M32 7 43 13v13l-11 7-11-7V13l11-6Z" />
        <path d="M14 33 25 39v13l-11 7-11-7V39l11-6Z" />
        <path d="M50 33 61 39v13l-11 7-11-7V39l11-6Z" />
        <path d="M32 35 43 41v13l-11 7-11-7V41l11-6Z" />
        <path d="M24 28 17 35" />
        <path d="M40 28 47 35" />
        <path d="M32 33v2" />
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

  if (type === "secure") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M32 5 52 14v17c0 14-8 24-20 29C20 55 12 45 12 31V14l20-9Z" />
        <path d="M24 33h16v14H24z" />
        <path d="M27 33v-6a5 5 0 0 1 10 0v6" />
        <path d="M32 39v4" />
      </svg>
    );
  }

  if (type === "terminal") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M8 12h48v38H8z" />
        <path d="M14 44h36" />
        <path d="M20 24 28 32l-8 8" />
        <path d="M33 40h12" />
        <path d="M24 56h16" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 5 54 18v28L32 59 10 46V18L32 5Z" />
      <path d="M10 18 32 31l22-13" />
      <path d="M32 31v28" />
      <path d="m20 24 12 7 12-7" />
      <path d="m20 39 12 7 12-7" />
    </svg>
  );
}

export function HomePage({ locale }: { locale: Locale }) {
  const copy = homeCopy[locale];
  const selectedInfrastructureCards =
    locale === "en" ? englishInfrastructureCards : infrastructureCards;
  const selectedHeroTelemetry =
    locale === "en" ? englishHeroTelemetry : heroTelemetry;
  const selectedInfrastructureShowcaseCards =
    locale === "en"
      ? englishInfrastructureShowcaseCards
      : infrastructureShowcaseCards;
  const selectedHowItWorksCards =
    locale === "en" ? englishHowItWorksCards : howItWorksCards;
  const homeHref = locale === "en" ? "/en#hero" : "#hero";
  const systemsHref = locale === "en" ? "/en#systems" : "#systems";
  const assistantHref = locale === "en" ? "/en#assistant" : "#assistant";

  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <a className="brand-lockup" href={homeHref} aria-label="Hakan Leonardo">
            <span>HAKAN LEONARDO</span>
            <span className="status-dot" aria-hidden="true" />
            <span className="system-online">[SYS_ONLINE]</span>
          </a>

          <nav className="site-nav" aria-label={copy.navLabel}>
            <a href={systemsHref}>{copy.navInfrastructure}</a>
            <a className="language-switcher" href={copy.langHref}>
              {copy.langLabel}
            </a>
          </nav>

          <a className="header-cta" href={assistantHref}>
            {copy.headerCta}
          </a>
        </div>
      </header>

      <main className="site-main">
        <section className="section-shell hero-section" id="hero">
          <span className="corner-bracket corner-bracket-top" aria-hidden="true" />
          <span className="corner-bracket corner-bracket-bottom" aria-hidden="true" />
          <div className="hero-copy">
            <p className="section-kicker">{copy.kicker}</p>
            <h1>{copy.title}</h1>
            <p className="hero-description">{copy.description}</p>
            <div className="button-group">
              <a className="button-primary" href={assistantHref}>
                <span>{copy.primaryCta}</span>
                <span aria-hidden="true">-&gt;</span>
              </a>
              <a className="button-secondary" href={systemsHref}>
                {copy.visionCta}
              </a>
            </div>
          </div>

          <div className="hero-assistant" id="assistant">
            <CoreAiChat locale={copy.chat} />
          </div>

          <div className="hero-telemetry" aria-label={copy.telemetryLabel}>
            {selectedHeroTelemetry.map(([label, value]) => (
              <div className="hero-telemetry-cell" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="section-shell infrastructure-showcase-section" id="systems">
          <span className="section-index" aria-hidden="true">
            {locale === "en" ? "[SYSTEMS]" : "[SİSTEMLER]"}
          </span>
          <div className="infrastructure-showcase-heading">
            <h2>{copy.infrastructureShowcaseTitle}</h2>
            <span className="gold-rule" aria-hidden="true" />
          </div>
          <div className="infrastructure-showcase-grid">
            {selectedInfrastructureShowcaseCards.map((card) => (
              <article className="infrastructure-showcase-card" key={card.title}>
                <span className="infrastructure-showcase-icon">
                  <InfrastructureIcon type={card.icon} />
                </span>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell how-it-works-section" id="how-it-works">
          <span className="section-index" aria-hidden="true">
            {locale === "en" ? "[PROCESS]" : "[SÜREÇ]"}
          </span>
          <div className="section-heading">
            <h2>{copy.howItWorksTitle}</h2>
            <p>{copy.howItWorksDescription}</p>
          </div>
          <div className="how-it-works-grid">
            {selectedHowItWorksCards.map((card) => (
              <article className="how-it-works-card" key={card.number}>
                <span>{card.number}</span>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell infrastructure-section" id="capabilities">
          <span className="section-index" aria-hidden="true">
            {locale === "en" ? "[CAPABILITIES]" : "[YETKİNLİKLER]"}
          </span>
          <div className="section-heading">
            <h2>{copy.infrastructureTitle}</h2>
            <p>{copy.infrastructureDescription}</p>
          </div>

          <div className="competency-grid">
            {selectedInfrastructureCards.map((card) => (
              <article className="competency-card" key={card.number}>
                <div className="competency-card-visual">
                  <Image
                    alt={`${card.title} ${copy.imageAltSuffix}`}
                    className="competency-card-image"
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    src={card.image}
                  />
                  <div className="competency-card-overlay" aria-hidden="true" />
                  <div className="competency-card-topline">
                    <span>{card.number}</span>
                    <strong>{card.symbol}</strong>
                  </div>
                </div>
                <div className="competency-card-body">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
                <div className="competency-logs" aria-hidden="true">
                  {card.logs.map((log) => (
                    <span key={log}>{log}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell philosophy-section vision-section" id="vision">
          <span className="section-index" aria-hidden="true">
            {locale === "en" ? "[VISION]" : "[VİZYON]"}
          </span>
          <div className="philosophy-copy-panel">
            <p>{copy.visionText}</p>
            <div className="manifesto-terminal">
              <p className="tone-neon">
                &gt; &quot;{copy.principle}&quot;
              </p>
              <p className="tone-gold">- Hakan Leonardo</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-cta">
          <span className="footer-bracket footer-bracket-left" aria-hidden="true" />
          <div>
            <h2>{copy.footerTitle}</h2>
            <p>{copy.footerText}</p>
          </div>
          <a className="footer-cta-button" href={assistantHref}>
            <span>{copy.footerCta}</span>
            <span aria-hidden="true">-&gt;</span>
          </a>
          <span className="footer-bracket footer-bracket-right" aria-hidden="true" />
        </div>

        <div className="footer-bottom">
          <a className="brand-lockup" href={homeHref} aria-label="Hakan Leonardo">
            <span>HAKAN LEONARDO</span>
            <span className="status-dot" aria-hidden="true" />
            <span className="system-online">[SYS_ONLINE]</span>
          </a>
          <p>{copy.footerCopyright}</p>
          <nav className="footer-nav" aria-label={copy.footerNavLabel}>
            <a href={systemsHref}>{copy.navInfrastructure}</a>
            <a href={assistantHref}>{copy.footerCore}</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
