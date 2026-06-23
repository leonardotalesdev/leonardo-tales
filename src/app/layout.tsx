import type { Metadata } from "next";
import "./globals.css";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://hakanleonardo.com"
).replace(/\/$/, "");
const siteTitle = "Hakan Leonardo | Yapay Zekâ İş Sistemleri";
const siteDescription =
  "Hakan Leonardo, işletmeler için AI müşteri temsilcisi, satış/teklif asistanı ve operasyon otomasyonu sistemleri tasarlar. İşinizi anlatın, doğru yapay zekâ başlangıç noktasını netleştirelim.";
const ogImage = "/og/hakan-leonardo-og.png";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Hakan Leonardo",
  title: {
    default: siteTitle,
    template: "%s | Hakan Leonardo",
  },
  description: siteDescription,
  keywords: [
    "yapay zekâ müşteri temsilcisi",
    "AI satış asistanı",
    "teklif asistanı",
    "operasyon otomasyonu",
    "işletmeler için yapay zekâ",
    "web sitesi yapay zekâ asistanı",
    "Hakan Leonardo",
  ],
  alternates: {
    canonical: "/",
    languages: {
      tr: "/",
      en: "/en",
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Hakan Leonardo",
    locale: "tr_TR",
    alternateLocale: ["en_US"],
    title: siteTitle,
    description:
      "AI müşteri temsilcisi, satış/teklif asistanı ve operasyon otomasyonu. İşinizi anlatın, doğru yapay zekâ başlangıç noktasını netleştirelim.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Hakan Leonardo — Yapay Zekâ İş Sistemleri",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description:
      "AI müşteri temsilcisi, satış/teklif asistanı ve operasyon otomasyonu. İşinizi anlatın, doğru yapay zekâ başlangıç noktasını netleştirelim.",
    images: [ogImage],
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/icon.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    apple: [
      {
        url: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Hakan Leonardo",
      url: siteUrl,
      logo: `${siteUrl}/brand/hakan-leonardo-logo.png`,
      description: siteDescription,
    },
    {
      "@type": "WebSite",
      name: "Hakan Leonardo",
      url: siteUrl,
      inLanguage: ["tr", "en"],
      description: siteDescription,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
