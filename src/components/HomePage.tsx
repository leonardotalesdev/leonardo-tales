import Image from "next/image";

import { CoreAiChat } from "@/components/CoreAiChat";

type Locale = "tr" | "en";

const infrastructureCards = [
  {
    number: "[01]",
    symbol: "<MA/>",
    title: "Çoklu Ajan Çerçeveleri",
    description: "Otonom zincirleme iş akışları ve karar mekanizmaları.",
    logs: ["chain.sync", "agent.mesh", "decision.map"],
    image: "/images/infrastructure/multi-agent-frameworks.png",
  },
  {
    number: "[02]",
    symbol: "{API}",
    title: "Akıllı Entegrasyonlar",
    description:
      "Mevcut veritabanı, gösterge paneli ve ERP sistemlerine akıllı bilişsel katmanların eklenmesi.",
    logs: ["erp.bridge", "data.layer", "cognitive.io"],
    image: "/images/infrastructure/smart-integrations.png",
  },
  {
    number: "[03]",
    symbol: "[DB]",
    title: "Edge Ölçekli Altyapı",
    description:
      "Supabase, Vercel Edge ve yüksek hızlı veritabanı mimarileriyle gerçek zamanlı ajan bellek sistemleri.",
    logs: ["edge.cache", "memory.bus", "realtime.io"],
    image: "/images/infrastructure/edge-scale-infrastructure.png",
  },
  {
    number: "[04]",
    symbol: "/FIX",
    title: "Kendi Kendini Onaran Otomasyon",
    description:
      "Hataları kendi kendine yakalayan ve düzelten akıllı kod döngüleri.",
    logs: ["error.scan", "patch.loop", "self.audit"],
    image: "/images/infrastructure/self-healing-automation.png",
  },
];

const terminalLines = [
  { text: "LEONARDO@TALES:~$ leonardo-tales onboard", tone: "gold" },
  { text: "> Leonardo Tales çekirdek sistemi başlatılıyor...", tone: "neon" },
  { text: "> Altyapı doğrulanıyor...", tone: "neon" },
  { text: "> Güvenli tüneller kuruluyor...", tone: "neon" },
  { text: "> Ajan çerçevesi yükleniyor...", tone: "neon" },
  { text: "", tone: "neon" },
  { text: "> Yapay zekâ ajanları başlatılıyor...", tone: "neon" },
  { text: "[✓] araştırmacı-ajan          [ÇEVRİMİÇİ]", tone: "neon" },
  { text: "[✓] stratejist-ajan           [ÇEVRİMİÇİ]", tone: "neon" },
  { text: "[✓] geliştirici-ajan          [ÇEVRİMİÇİ]", tone: "neon" },
  { text: "[✓] denetçi-ajan              [ÇEVRİMİÇİ]", tone: "neon" },
  { text: "[✓] orkestrasyon-çekirdeği    [ÇEVRİMİÇİ]", tone: "neon" },
  { text: "", tone: "neon" },
  { text: "> Bellek bankaları senkronize ediliyor...", tone: "neon" },
  { text: "> Karar motorları kalibre ediliyor...", tone: "neon" },
  { text: "> Sistem durumu: OPTİMAL", tone: "gold" },
  { text: "leonardo@core:~$ _", tone: "neon" },
];

const heroTelemetry = [
  ["AGENTS", "03 ONLINE"],
  ["BELLEK", "SENKRON HAZIR"],
  ["HAT", "EDGE AKTİF"],
  ["ÇEKİRDEK", "DİNLİYOR"],
];

const philosophyCards = [
  {
    icon: "cube",
    title: "Soyutlama",
    description:
      "Karmaşıklığı soyutlar, basit ve ölçeklenebilir sistem mimarileri tasarlarız.",
  },
  {
    icon: "brain",
    title: "Zekâ",
    description:
      "Sisteme zekâ katar, öğrenen ve adaptasyon sağlayan yapılar geliştiririz.",
  },
  {
    icon: "shield",
    title: "Otonomi",
    description:
      "Sistemlerin bağımsız karar almasını sağlar, otonom altyapılar kurarız.",
  },
  {
    icon: "bolt",
    title: "Etki",
    description:
      "Teknolojiyi sadece bir araç değil, büyük bir etki yaratacak güç olarak kullanırız.",
  },
];

const infrastructureShowcaseCards = [
  {
    icon: "network",
    title: "Çoklu Ajan Sistemleri",
    description: "Birden fazla uzman ajanın birlikte çalıştığı otonom ekosistemler.",
  },
  {
    icon: "database",
    title: "Bellek ve Bilgi",
    description: "Uzun süreli bellek, bilgi yönetimi ve bağlamsal öğrenme sistemleri.",
  },
  {
    icon: "workflow",
    title: "İş Akışı Otomasyonu",
    description: "İş akışlarını otonomlaştıran akıllı otomasyon ve orkestrasyon.",
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
    title: "API ve Entegrasyonlar",
    description: "Mevcut sistemlerinizle kusursuz entegrasyon ve geniş API ekosistemi.",
  },
];

const englishInfrastructureCards = [
  {
    number: "[01]",
    symbol: "<MA/>",
    title: "Multi-Agent Frameworks",
    description: "Autonomous chained workflows and decision mechanisms.",
    logs: ["chain.sync", "agent.mesh", "decision.map"],
    image: "/images/infrastructure/multi-agent-frameworks.png",
  },
  {
    number: "[02]",
    symbol: "{API}",
    title: "Intelligent Integrations",
    description:
      "Adding cognitive layers to existing databases, dashboards, and ERP systems.",
    logs: ["erp.bridge", "data.layer", "cognitive.io"],
    image: "/images/infrastructure/smart-integrations.png",
  },
  {
    number: "[03]",
    symbol: "[DB]",
    title: "Edge-Scale Infrastructure",
    description:
      "Real-time agent memory systems with Supabase, Vercel Edge, and high-speed database architectures.",
    logs: ["edge.cache", "memory.bus", "realtime.io"],
    image: "/images/infrastructure/edge-scale-infrastructure.png",
  },
  {
    number: "[04]",
    symbol: "/FIX",
    title: "Self-Healing Automation",
    description: "Intelligent code loops that detect and repair failures autonomously.",
    logs: ["error.scan", "patch.loop", "self.audit"],
    image: "/images/infrastructure/self-healing-automation.png",
  },
];

const englishTerminalLines = [
  { text: "LEONARDO@TALES:~$ leonardo-tales onboard", tone: "gold" },
  { text: "> Leonardo Tales core system initializing...", tone: "neon" },
  { text: "> Infrastructure validating...", tone: "neon" },
  { text: "> Secure tunnels establishing...", tone: "neon" },
  { text: "> Agent framework loading...", tone: "neon" },
  { text: "", tone: "neon" },
  { text: "> AI agents starting...", tone: "neon" },
  { text: "[✓] researcher-agent          [ONLINE]", tone: "neon" },
  { text: "[✓] strategist-agent          [ONLINE]", tone: "neon" },
  { text: "[✓] builder-agent             [ONLINE]", tone: "neon" },
  { text: "[✓] auditor-agent             [ONLINE]", tone: "neon" },
  { text: "[✓] orchestration-core        [ONLINE]", tone: "neon" },
  { text: "", tone: "neon" },
  { text: "> Memory banks synchronizing...", tone: "neon" },
  { text: "> Decision engines calibrating...", tone: "neon" },
  { text: "> System status: OPTIMAL", tone: "gold" },
  { text: "leonardo@core:~$ _", tone: "neon" },
];

const englishHeroTelemetry = [
  ["AGENTS", "03 ONLINE"],
  ["MEMORY", "SYNC READY"],
  ["LINE", "EDGE ACTIVE"],
  ["CORE", "LISTENING"],
];

const englishPhilosophyCards = [
  {
    icon: "cube",
    title: "Abstraction",
    description:
      "We abstract complexity and design simple, scalable system architectures.",
  },
  {
    icon: "brain",
    title: "Intelligence",
    description:
      "We add intelligence to systems and develop structures that learn and adapt.",
  },
  {
    icon: "shield",
    title: "Autonomy",
    description:
      "We enable systems to make independent decisions and build autonomous infrastructure.",
  },
  {
    icon: "bolt",
    title: "Impact",
    description:
      "We use technology not only as a tool, but as a force for meaningful impact.",
  },
];

const englishInfrastructureShowcaseCards = [
  {
    icon: "network",
    title: "Multi-Agent Systems",
    description: "Autonomous ecosystems where multiple expert agents work together.",
  },
  {
    icon: "database",
    title: "Memory and Knowledge",
    description: "Long-term memory, knowledge management, and contextual learning systems.",
  },
  {
    icon: "workflow",
    title: "Workflow Automation",
    description: "Intelligent automation and orchestration for autonomous workflows.",
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
    title: "API and Integrations",
    description: "Seamless integration with existing systems and broad API ecosystems.",
  },
];

const homeCopy = {
  tr: {
    navLabel: "Birincil gezinme",
    navInfrastructure: "/altyapı",
    langHref: "/en",
    langLabel: "EN",
    headerCta: "ÇEKİRDEĞİ_BAŞLAT",
    kicker: "// OTONOM EKOSİSTEMLER TASARLANIYOR",
    title: "Ajan İşletim Sistemi Geliyor. Altyapıyı Şimdi Kur.",
    description:
      "Yapay zekâ modellerini basit araçlar olarak kullanmayı bırakın. Geleceğin operasyonları, kendi kendine kararlar alabilen, belleği olan ve sistemleri yöneten akıllı çoklu ajan ağları üzerinde çalışacak. Leonardo Tales, işletmeniz ve projeleriniz için bu otonom altyapıyı kurar.",
    primaryCta: "ÇEKİRDEĞİ_BAŞLAT",
    manifestoCta: "MANİFESTOYU_OKU",
    terminalLabel: "Ajan başlangıç terminali",
    telemetryLabel: "Giriş sistem telemetrisi",
    manifestoTitle: "Leonardo Tales: Dijital Emeğin Zanaatı",
    manifestoText:
      "Biz sadece kod yazmayız. Karmaşık problemleri çözen, değer üreten ve gelecekte rekabet avantajı sağlayan dijital varlıklar inşa ederiz. Her proje, bir sanat eseri titizliğiyle, bir mühendislik disipliniyle ve bir stratejist zekâsıyla ele alınır.",
    quote: "Ruhun elle birlikte çalışmadığı yerde sanat olmaz.",
    infrastructureShowcaseTitle: "İnşa Ettiğimiz Altyapı",
    infrastructureTitle: "Altyapı ve Yetkinlikler",
    infrastructureDescription:
      "Otonom ajan sistemleri için karar, entegrasyon, bellek ve iyileşme katmanlarını tek altyapı disiplininde birleştiren teknik yetkinlik matrisi.",
    imageAltSuffix: "görseli",
    coreIndex: "[SİSTEM_ÇEKİRDEĞİ]",
    coreTitle: "Çekirdek Yapay Zekâ Sohbet Arayüzü",
    coreSubtitle: "Ajan İşletim Sistemi Arayüzü",
    footerTitle: "Geleceği İnşa Etmeye Hazır mısınız?",
    footerText: "Geleceğin altyapısını bugün inşa etmeye başlayalım.",
    footerCta: "ÇEKİRDEK_PROTOKOLÜ_BAŞLAT",
    footerCopyright: "© 2026 Leonardo Tales. Tüm sistemler operasyonel.",
    footerNavLabel: "Alt gezinme",
    footerCore: "/çekirdek",
    chat: "tr" as const,
  },
  en: {
    navLabel: "Primary navigation",
    navInfrastructure: "/infrastructure",
    langHref: "/",
    langLabel: "TR",
    headerCta: "INITIATE_CORE",
    kicker: "// ARCHITECTING AUTONOMOUS ECOSYSTEMS",
    title: "The Agentic OS Is Coming. Build the Infrastructure Now.",
    description:
      "Stop treating AI models as simple tools. The operations of the future will run on intelligent multi-agent networks that can decide, remember, and operate systems autonomously. Leonardo Tales builds that autonomous infrastructure for your business and projects.",
    primaryCta: "INITIATE_CORE",
    manifestoCta: "READ_MANIFESTO",
    terminalLabel: "Agent boot terminal",
    telemetryLabel: "Entry system telemetry",
    manifestoTitle: "Leonardo Tales: The Craft of Digital Labor",
    manifestoText:
      "We do not merely write code. We build digital entities that solve complex problems, create value, and generate future competitive advantage. Every project is handled with artistic precision, engineering discipline, and strategic intelligence.",
    quote: "Where the spirit does not work with the hand, there is no art.",
    infrastructureShowcaseTitle: "The Infrastructure We Build",
    infrastructureTitle: "Infrastructure and Capabilities",
    infrastructureDescription:
      "A technical capability matrix combining decision, integration, memory, and recovery layers for autonomous agent systems.",
    imageAltSuffix: "visual",
    coreIndex: "[SYSTEM_CORE]",
    coreTitle: "Core AI Chat Interface",
    coreSubtitle: "Agentic Operating System Interface",
    footerTitle: "Ready to Build the Future?",
    footerText: "Let’s start building the infrastructure of the future today.",
    footerCta: "INITIATE_CORE_PROTOCOL",
    footerCopyright: "© 2026 Leonardo Tales. All systems operational.",
    footerNavLabel: "Footer navigation",
    footerCore: "/core",
    chat: "en" as const,
  },
};

function PhilosophyIcon({ type }: { type: string }) {
  if (type === "cube") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 5 41 14.5v19L24 43 7 33.5v-19L24 5Z" />
        <path d="M7 14.5 24 24l17-9.5" />
        <path d="M24 24v19" />
      </svg>
    );
  }

  if (type === "brain") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M18 9c-4 0-7 3-7 7-4 1-6 4-6 8s2 7 6 8c0 4 3 7 7 7 3 0 5-1 6-3 1 2 3 3 6 3 4 0 7-3 7-7 4-1 6-4 6-8s-2-7-6-8c0-4-3-7-7-7-3 0-5 1-6 3-1-2-3-3-6-3Z" />
        <path d="M24 12v24" />
        <path d="M15 18c3 0 5 2 5 5" />
        <path d="M33 18c-3 0-5 2-5 5" />
        <path d="M14 30c3 0 5-2 5-5" />
        <path d="M34 30c-3 0-5-2-5-5" />
      </svg>
    );
  }

  if (type === "shield") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 5 39 11v12c0 10-6 17-15 20C15 40 9 33 9 23V11l15-6Z" />
        <path d="m17 24 5 5 10-11" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M27 4 10 27h13l-2 17 17-24H25l2-16Z" />
    </svg>
  );
}

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
  const selectedTerminalLines =
    locale === "en" ? englishTerminalLines : terminalLines;
  const selectedHeroTelemetry =
    locale === "en" ? englishHeroTelemetry : heroTelemetry;
  const selectedPhilosophyCards =
    locale === "en" ? englishPhilosophyCards : philosophyCards;
  const selectedInfrastructureShowcaseCards =
    locale === "en"
      ? englishInfrastructureShowcaseCards
      : infrastructureShowcaseCards;
  const homeHref = locale === "en" ? "/en#hero" : "#hero";
  const manifestoHref = locale === "en" ? "/en/manifesto" : "/manifesto";
  const infrastructureHref = locale === "en" ? "/en#infrastructure" : "#infrastructure";
  const coreHref = locale === "en" ? "/en#core-ai" : "#core-ai";

  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <a className="brand-lockup" href={homeHref} aria-label="Leonardo Tales">
            <span>LEONARDO TALES</span>
            <span className="status-dot" aria-hidden="true" />
            <span className="system-online">[SYS_ONLINE]</span>
          </a>

          <nav className="site-nav" aria-label={copy.navLabel}>
            <a href={manifestoHref}>/manifesto</a>
            <a href={infrastructureHref}>{copy.navInfrastructure}</a>
            <a className="language-switcher" href={copy.langHref}>
              {copy.langLabel}
            </a>
          </nav>

          <a className="header-cta" href={coreHref}>
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
              <a className="button-primary" href={coreHref}>
                <span>{copy.primaryCta}</span>
                <span aria-hidden="true">-&gt;</span>
              </a>
              <a className="button-secondary" href={manifestoHref}>
                {copy.manifestoCta}
              </a>
            </div>
          </div>

          <div className="terminal-widget" aria-label={copy.terminalLabel}>
            <div className="terminal-titlebar">
              <span>LEONARDO_TALES_CORE_BOOT.log</span>
              <span className="terminal-window-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </div>
            <div className="terminal-lines">
              {selectedTerminalLines.map((line, index) => (
                <p
                  className={`terminal-line ${
                    line.tone === "gold" ? "tone-gold" : "tone-neon"
                  }`}
                  key={`${line.text}-${index}`}
                  style={{ animationDelay: `${index * 420}ms` }}
                >
                  {line.text}
                </p>
              ))}
            </div>
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

        <section className="section-shell philosophy-section" id="manifesto">
          <span className="section-index" aria-hidden="true">
            [MANİFESTO]
          </span>
          <div className="philosophy-copy-panel">
            <h2>{copy.manifestoTitle}</h2>
            <span className="gold-rule" aria-hidden="true" />
            <p>{copy.manifestoText}</p>
            <div className="manifesto-terminal">
              <p className="tone-neon">
                &gt; &quot;{copy.quote}&quot;
              </p>
              <p className="tone-gold">- Leonardo da Vinci</p>
            </div>
          </div>

          <div className="philosophy-card-grid">
            {selectedPhilosophyCards.map((card) => (
              <article className="philosophy-card" key={card.title}>
                <span className="philosophy-card-icon" aria-hidden="true">
                  <PhilosophyIcon type={card.icon} />
                </span>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell infrastructure-showcase-section">
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

        <section className="section-shell infrastructure-section" id="infrastructure">
          <span className="section-index" aria-hidden="true">
            [ALTYAPI]
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

        <section className="section-shell core-ai-section" id="core-ai">
          <span className="section-index" aria-hidden="true">
            {copy.coreIndex}
          </span>
          <div className="section-heading section-heading-centered">
            <h2>{copy.coreTitle}</h2>
            <p>{copy.coreSubtitle}</p>
          </div>
          <CoreAiChat locale={copy.chat} />
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-cta">
          <span className="footer-bracket footer-bracket-left" aria-hidden="true" />
          <div>
            <h2>{copy.footerTitle}</h2>
            <p>{copy.footerText}</p>
          </div>
          <a className="footer-cta-button" href={coreHref}>
            <span>{copy.footerCta}</span>
            <span aria-hidden="true">-&gt;</span>
          </a>
          <span className="footer-bracket footer-bracket-right" aria-hidden="true" />
        </div>

        <div className="footer-bottom">
          <a className="brand-lockup" href={homeHref} aria-label="Leonardo Tales">
            <span>LEONARDO TALES</span>
            <span className="status-dot" aria-hidden="true" />
            <span className="system-online">[SYS_ONLINE]</span>
          </a>
          <p>{copy.footerCopyright}</p>
          <nav className="footer-nav" aria-label={copy.footerNavLabel}>
            <a href={manifestoHref}>/manifesto</a>
            <a href={infrastructureHref}>{copy.navInfrastructure}</a>
            <a href={coreHref}>{copy.footerCore}</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
