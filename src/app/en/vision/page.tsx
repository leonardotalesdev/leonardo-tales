import type { Metadata } from "next";

import { VisionPage } from "@/components/VisionPage";

export const metadata: Metadata = {
  title: {
    absolute: "Vision | Hakan Leonardo",
  },
  description:
    "The Hakan Leonardo vision for AI customer representatives, sales advisors, and operations automation systems for businesses.",
  alternates: {
    canonical: "/en/vision",
    languages: {
      tr: "/vizyon",
      en: "/en/vision",
    },
  },
  openGraph: {
    type: "article",
    locale: "en_US",
    siteName: "Hakan Leonardo",
    title: "Vision | Hakan Leonardo",
    description:
      "A practical vision for AI customer representatives, sales advisors, and operations automation systems.",
    url: "/en/vision",
    images: [
      {
        url: "/og/hakan-leonardo-og.png",
        width: 1200,
        height: 630,
        alt: "Hakan Leonardo — AI Business Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vision | Hakan Leonardo",
    description:
      "A practical vision for AI customer representatives, sales advisors, and operations automation systems.",
    images: ["/og/hakan-leonardo-og.png"],
  },
};

export default function EnglishVisionPage() {
  return <VisionPage locale="en" />;
}
