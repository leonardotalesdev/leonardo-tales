import type { Metadata } from "next";

import { HomePage } from "@/components/HomePage";

export const metadata: Metadata = {
  title: {
    absolute: "Hakan Leonardo | AI Business Systems",
  },
  description:
    "Hakan Leonardo designs AI customer representatives, sales/proposal assistants, and operations automation systems for businesses.",
  alternates: {
    canonical: "/en",
    languages: {
      tr: "/",
      en: "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Hakan Leonardo",
    title: "Hakan Leonardo | AI Business Systems",
    description:
      "Hakan Leonardo designs AI customer representatives, sales/proposal assistants, and operations automation systems for businesses.",
    url: "/en",
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
    title: "Hakan Leonardo | AI Business Systems",
    description:
      "Hakan Leonardo designs AI customer representatives, sales/proposal assistants, and operations automation systems for businesses.",
    images: ["/og/hakan-leonardo-og.png"],
  },
};

export default function EnglishPage() {
  return <HomePage locale="en" />;
}
