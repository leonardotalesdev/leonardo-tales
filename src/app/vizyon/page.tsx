import type { Metadata } from "next";

import { VisionPage } from "@/components/VisionPage";

export const metadata: Metadata = {
  title: {
    absolute: "Vizyon | Hakan Leonardo",
  },
  description:
    "Hakan Leonardo vizyonu: işletmeler için yapay zekâ müşteri temsilcileri, satış danışmanları ve operasyon otomasyonu sistemleri.",
  alternates: {
    canonical: "/vizyon",
    languages: {
      tr: "/vizyon",
      en: "/en/vision",
    },
  },
  openGraph: {
    type: "article",
    locale: "tr_TR",
    siteName: "Hakan Leonardo",
    title: "Vizyon | Hakan Leonardo",
    description:
      "İşletmeler için yapay zekâ müşteri temsilcileri, satış danışmanları ve operasyon otomasyonu sistemleri.",
    url: "/vizyon",
    images: [
      {
        url: "/og/hakan-leonardo-og.png",
        width: 1200,
        height: 630,
        alt: "Hakan Leonardo — Yapay Zekâ İş Sistemleri",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vizyon | Hakan Leonardo",
    description:
      "İşletmeler için yapay zekâ müşteri temsilcileri, satış danışmanları ve operasyon otomasyonu sistemleri.",
    images: ["/og/hakan-leonardo-og.png"],
  },
};

export default function Page() {
  return <VisionPage locale="tr" />;
}
