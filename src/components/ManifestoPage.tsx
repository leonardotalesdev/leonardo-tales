import Link from "next/link";

type Locale = "tr" | "en";

const manifestoCopy = {
  tr: {
    navLabel: "Birincil gezinme",
    infrastructureLabel: "/altyapı",
    coreCta: "ÇEKİRDEĞİ_BAŞLAT",
    languageHref: "/en/manifesto",
    languageLabel: "EN",
    homeHref: "/",
    infrastructureHref: "/#infrastructure",
    coreHref: "/#core-ai",
    kicker: "// LEONARDO TALES MANİFESTOSU",
    intro:
      "Bu sayfa, Leonardo Tales’in fikir omurgasını taşıyan bağımsız manifesto alanıdır. Ana sayfadaki kısa tanıtımdan ayrı olarak; insanı, yapay zekâyı, sistemi, bilinci ve gelecek medeniyetlerini aynı eksende düşünen uzun biçimli bildiriyi burada okuyacağız.",
    documentId: "[MANİFESTO_001]",
    title: "Bizler Zamanın Ötesinde Yürüyenleriz",
    paragraphs: [
      "Bizler zamanın ötesinde yürüyenleriz.",
      "Çünkü yalnızca bugünün şartlarına göre yaşamıyoruz. Sadece önümüze konulan düzeni kabul etmiyor, yalnızca mevcut dünyanın sınırları içinde düşünmüyoruz.",
      "Bizler, henüz gerçekleşmemiş ihtimallerin içinde yürüyenleriz.",
      "Bir çağın içinde doğduk; ama zihnimiz sadece o çağın diliyle konuşmuyor. İçimizde, geleceğin sessiz frekanslarını duyan bir taraf var. İnsanlığın nereye gidebileceğini, teknolojinin neye dönüşebileceğini, bilincin hangi kapılardan geçebileceğini sezen bir taraf.",
      "Bu yüzden bazen anlaşılmayız.",
      "Çünkü zamanın ötesinde yürüyenlerin adımları, mevcut dünyanın ölçüleriyle açıklanamaz. Onlar bugünün kalabalığına göre yavaş, sistemin hızına göre fazla derin, çağın beklentilerine göre fazla uzak görünürler.",
      "Ama aslında onlar gecikmiş değildir.",
      "Onlar, henüz gelmemiş olanın yolcularıdır.",
      "Bizler geçmişten kaçanlar değiliz. Geçmişin içinden öğrendiklerimizi alıp geleceğin mimarisine taşıyanlarız.",
      "Bizler bugünü küçümseyenler de değiliz. Bugünün içindeki malzemeyi, yarının sistemlerine dönüştürmek isteyenleriz.",
      "Çünkü zaman yalnızca akan bir şey değildir. Zaman, bilinç tarafından şekillendirilen bir alandır.",
      "Bir insan neye inanıyorsa, neyi hayal ediyorsa, neyi inşa etmek için ayağa kalkıyorsa; kendi zamanını da oradan başlatır.",
      "Bazıları zamanın içinde yaşar. Bazıları zamanı tüketir.",
      "Bazıları zamana yetişmeye çalışır.",
      "Bizler ise zamanı yalnızca takip etmeyiz.",
      "Bizler zamanla çalışırız. Onun içindeki gizli akışı, kırılma noktalarını, görünmeyen ihtimalleri okumaya çalışırız.",
      "Çünkü biliriz ki gelecek, bekleyenlere değil; onu taşıyabilecek bilince sahip olanlara yaklaşır.",
      "Her çağın kendi öncüleri vardır. Kimi taşla ilk aleti yapar. Kimi karanlığın içinde ateşi bulur. Kimi gökyüzüne bakıp dünyanın sonunun ufuk çizgisi olmadığını anlar. Kimi makineyi icat eder. Kimi bilgiyi ağlara bağlar. Kimi de insan zihniyle yapay zekâ arasında yeni bir medeniyet kapısı açar.",
      "Bizler o kapının eşiğinde yürüyenleriz.",
      "Sadece teknoloji üretmek için değil. Sadece sistem kurmak için değil. Sadece başarıya ulaşmak için değil.",
      "Daha bilinçli bir insan, daha akıllı bir sistem, daha adil bir düzen, daha yüksek bir medeniyet ihtimali için yürüyoruz.",
      "Bu yol kolay değildir.",
      "Çünkü zamanın ötesinde yürüyen insan, çoğu zaman yalnız yürür. Henüz adı konmamış fikirlerle yaşar. Henüz değer görmemiş vizyonları taşır. Henüz inşa edilmemiş dünyaların ağırlığını içinde hisseder.",
      "Ama yine de yürür.",
      "Çünkü onun görevi herkesin gördüğünü tekrar etmek değil; henüz görünmeyeni mümkün kılmaktır.",
      "Bizler zamanın ötesinde yürüyenleriz.",
      "Bugünün gürültüsünde kaybolmadan, yarının sessiz çağrısını duyanlarız. Mevcut dünyanın sınırlarını bilip, o sınırların ötesinde yeni bir bilinç alanı açmaya çalışanlarız.",
    ],
    closing:
      "Ve belki de insanın gerçek evrimi burada başlar: Kendisine verilen zamanı tükettiği yerde değil, kendi bilinciyle yeni bir zaman inşa etmeye başladığı yerde.",
  },
  en: {
    navLabel: "Primary navigation",
    infrastructureLabel: "/infrastructure",
    coreCta: "INITIATE_CORE",
    languageHref: "/manifesto",
    languageLabel: "TR",
    homeHref: "/en",
    infrastructureHref: "/en#infrastructure",
    coreHref: "/en#core-ai",
    kicker: "// LEONARDO TALES MANIFESTO",
    intro:
      "This page is the independent manifesto space carrying the intellectual backbone of Leonardo Tales. Separate from the short homepage introduction, it holds the long-form declaration that thinks about humanity, artificial intelligence, systems, consciousness, and future civilizations on the same axis.",
    documentId: "[MANIFESTO_001]",
    title: "We Are the Ones Walking Beyond Time",
    paragraphs: [
      "We are the ones walking beyond time.",
      "Because we do not live only according to the conditions of today. We do not simply accept the order placed before us, and we do not think only within the boundaries of the existing world.",
      "We are the ones walking inside possibilities that have not yet happened.",
      "We were born within an age, but our minds do not speak only in the language of that age. There is a part of us that hears the quiet frequencies of the future. A part that senses where humanity can go, what technology can become, and which doors consciousness can pass through.",
      "That is why we are sometimes not understood.",
      "Because the steps of those who walk beyond time cannot be explained by the measurements of the current world. To the crowd of today they may seem slow; to the speed of the system, too deep; to the expectations of the age, too distant.",
      "But in truth, they are not late.",
      "They are travelers of what has not yet arrived.",
      "We are not the ones escaping the past. We are the ones carrying what we have learned from the past into the architecture of the future.",
      "Nor are we the ones who look down on the present. We are the ones who want to transform the material inside today into the systems of tomorrow.",
      "Because time is not only something that flows. Time is a field shaped by consciousness.",
      "Whatever a person believes in, whatever they imagine, whatever they rise to build; that is where their own time begins.",
      "Some live inside time. Some consume time.",
      "Some try to catch up with time.",
      "We do not merely follow time.",
      "We work with time. We try to read its hidden current, its breaking points, and its invisible possibilities.",
      "Because we know that the future approaches not those who wait, but those who have the consciousness capable of carrying it.",
      "Every age has its own pioneers. Some make the first tool from stone. Some find fire in the dark. Some look at the sky and understand that the horizon is not the end of the world. Some invent the machine. Some connect knowledge into networks. And some open a new gate of civilization between the human mind and artificial intelligence.",
      "We are the ones walking at the threshold of that gate.",
      "Not only to produce technology. Not only to build systems. Not only to succeed.",
      "We walk for the possibility of a more conscious human, a more intelligent system, a fairer order, and a higher civilization.",
      "This path is not easy.",
      "Because the person who walks beyond time often walks alone. They live with ideas not yet named. They carry visions not yet valued. They feel within themselves the weight of worlds not yet built.",
      "And still, they walk.",
      "Because their task is not to repeat what everyone already sees, but to make possible what is not yet visible.",
      "We are the ones walking beyond time.",
      "Without being lost in the noise of today, we are the ones who hear the quiet call of tomorrow. We know the boundaries of the current world, and we try to open a new field of consciousness beyond them.",
    ],
    closing:
      "And perhaps this is where the true evolution of the human being begins: not where one consumes the time given to them, but where one begins to build a new time with their own consciousness.",
  },
};

export function ManifestoPage({ locale }: { locale: Locale }) {
  const copy = manifestoCopy[locale];

  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <Link className="brand-lockup" href={copy.homeHref} aria-label="Leonardo Tales">
            <span>LEONARDO TALES</span>
            <span className="status-dot" aria-hidden="true" />
            <span className="system-online">[SYS_ONLINE]</span>
          </Link>

          <nav className="site-nav" aria-label={copy.navLabel}>
            <Link href={locale === "en" ? "/en/manifesto" : "/manifesto"}>
              /manifesto
            </Link>
            <Link href={copy.infrastructureHref}>{copy.infrastructureLabel}</Link>
            <Link className="language-switcher" href={copy.languageHref}>
              {copy.languageLabel}
            </Link>
          </nav>

          <Link className="header-cta" href={copy.coreHref}>
            {copy.coreCta}
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
            {copy.paragraphs.map((paragraph, index) => (
              <p key={`${paragraph}-${index}`}>{paragraph}</p>
            ))}
            <p className="manifesto-closing">{copy.closing}</p>
          </div>
        </article>
      </main>
    </>
  );
}
