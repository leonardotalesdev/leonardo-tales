import Link from "next/link";

type Locale = "tr" | "en";

const visionPrinciples = {
  tr: [
    {
      title: "Soyutlama",
      description:
        "Karmaşık iş süreçlerini sade ve uygulanabilir sistemlere dönüştürürüz.",
    },
    {
      title: "Zekâ",
      description:
        "İşletmenin ihtiyacını anlayan, öğrenmeye açık ve düzenli akışlar kurarız.",
    },
    {
      title: "Kontrol",
      description:
        "Yapay zekâyı insan onayı, sınırlar ve güvenli iş akışları içinde konumlandırırız.",
    },
    {
      title: "Etki",
      description:
        "Teknolojiyi gösteriş için değil, gerçek iş sonucu üretmek için kullanırız.",
    },
  ],
  en: [
    {
      title: "Abstraction",
      description:
        "We turn complex business processes into simple and applicable systems.",
    },
    {
      title: "Intelligence",
      description:
        "We build organized flows that understand the business need and can improve over time.",
    },
    {
      title: "Control",
      description:
        "We place AI inside human approval, clear boundaries, and safe business workflows.",
    },
    {
      title: "Impact",
      description:
        "We use technology for real business outcomes, not for spectacle.",
    },
  ],
};

const visionCopy = {
  tr: {
    navLabel: "Birincil gezinme",
    visionLabel: "/vizyon",
    infrastructureLabel: "/sistemler",
    assistantCta: "ASİSTANI_BAŞLAT",
    languageHref: "/en/vision",
    languageLabel: "EN",
    homeHref: "/",
    visionHref: "/vizyon",
    infrastructureHref: "/#systems",
    assistantHref: "/#assistant",
    kicker: "// HAKAN LEONARDO VİZYONU",
    documentId: "[VİZYON_001]",
    title: "Hakan Leonardo Vizyonu: Dijital Emeğin Yeni Altyapısı",
    intro:
      "Hakan Leonardo’nun vizyonu, işletmelerin dijital emeğini yeniden tasarlamaktır. Web siteleri, müşteri temsilcileri, satış akışları ve operasyonel süreçler artık yalnızca statik araçlar olmak zorunda değildir. Doğru kurulan yapay zekâ sistemleri; müşteriyi karşılayan, ihtiyacı anlayan, bilgiyi düzenleyen, işi sınıflandıran ve insan ekibine daha temiz bir akış teslim eden yeni bir iş katmanı oluşturur.",
    body:
      "Bu yaklaşımda amaç insanı devreden çıkarmak değil; insan emeğini daha bilinçli, ölçülebilir ve etkili hale getirmektir. Hakan Leonardo, işletmeler için sade görünen ama arkasında kontrollü, güvenli ve ölçeklenebilir çalışan yapay zekâ sistemleri tasarlar.",
    principle:
      "Teknoloji, insan emeğinin yerini almak için değil; onu daha bilinçli, ölçülebilir ve etkili hale getirmek için tasarlanmalıdır.",
    principlesTitle: "Çalışma Prensipleri",
  },
  en: {
    navLabel: "Primary navigation",
    visionLabel: "/vision",
    infrastructureLabel: "/systems",
    assistantCta: "START_ASSISTANT",
    languageHref: "/vizyon",
    languageLabel: "TR",
    homeHref: "/en",
    visionHref: "/en/vision",
    infrastructureHref: "/en#systems",
    assistantHref: "/en#assistant",
    kicker: "// HAKAN LEONARDO VISION",
    documentId: "[VISION_001]",
    title: "Hakan Leonardo Vision: The New Infrastructure of Digital Labor",
    intro:
      "Hakan Leonardo’s vision is to redesign the digital labor of businesses. Websites, customer representatives, sales flows, and operational processes no longer have to remain static tools. Properly designed AI systems create a new business layer that greets customers, understands needs, organizes information, classifies work, and hands a cleaner flow to the human team.",
    body:
      "The goal is not to remove people from the process. The goal is to make human labor more conscious, measurable, and effective. Hakan Leonardo designs AI systems that look simple on the surface while operating with controlled, secure, and scalable structure underneath.",
    principle:
      "Technology should be designed not to replace human labor, but to make it more conscious, measurable, and effective.",
    principlesTitle: "Working Principles",
  },
};

export function VisionPage({ locale }: { locale: Locale }) {
  const copy = visionCopy[locale];
  const principles = visionPrinciples[locale];

  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <Link className="brand-lockup" href={copy.homeHref} aria-label="Hakan Leonardo">
            <span>HAKAN LEONARDO</span>
            <span className="status-dot" aria-hidden="true" />
            <span className="system-online">[SYS_ONLINE]</span>
          </Link>

          <nav className="site-nav" aria-label={copy.navLabel}>
            <Link href={copy.visionHref}>{copy.visionLabel}</Link>
            <Link href={copy.infrastructureHref}>{copy.infrastructureLabel}</Link>
            <Link className="language-switcher" href={copy.languageHref}>
              {copy.languageLabel}
            </Link>
          </nav>

          <Link className="header-cta" href={copy.assistantHref}>
            {copy.assistantCta}
          </Link>
        </div>
      </header>

      <main className="manifesto-page">
        <section className="manifesto-hero">
          <span className="corner-bracket corner-bracket-top" aria-hidden="true" />
          <span className="corner-bracket corner-bracket-bottom" aria-hidden="true" />
          <div className="manifesto-hero-copy">
            <p className="section-kicker">{copy.kicker}</p>
            <p>{copy.intro}</p>
          </div>
        </section>

        <article className="manifesto-document">
          <div className="manifesto-document-header">
            <span>{copy.documentId}</span>
          </div>
          <div className="manifesto-document-body">
            <h1>{copy.title}</h1>
            <p className="manifesto-lede">{copy.body}</p>
            <blockquote>{copy.principle}</blockquote>
            <h2>{copy.principlesTitle}</h2>
            {principles.map((principle) => (
              <section key={principle.title}>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </section>
            ))}
          </div>
        </article>
      </main>
    </>
  );
}
