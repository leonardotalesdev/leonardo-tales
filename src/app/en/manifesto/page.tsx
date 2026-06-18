import type { Metadata } from "next";

import { ManifestoPage } from "@/components/ManifestoPage";

export const metadata: Metadata = {
  title: "Manifesto | Leonardo Tales",
  description:
    "The Leonardo Tales manifesto: a digital-age declaration about humanity, artificial intelligence, systems, consciousness, and future civilizations.",
  alternates: {
    canonical: "/en/manifesto",
    languages: {
      tr: "/manifesto",
      en: "/en/manifesto",
    },
  },
  openGraph: {
    locale: "en_US",
    title: "Manifesto | Leonardo Tales",
    description:
      "A digital-age declaration about humanity, artificial intelligence, systems, consciousness, and future civilizations.",
    url: "/en/manifesto",
  },
};

export default function EnglishManifestoPage() {
  return <ManifestoPage locale="en" />;
}
