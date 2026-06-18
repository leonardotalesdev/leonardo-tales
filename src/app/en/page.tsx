import type { Metadata } from "next";

import { HomePage } from "@/components/HomePage";

export const metadata: Metadata = {
  title: "Leonardo Tales | AI-Agent Operating System",
  description:
    "Leonardo Tales is an AI-agent operating system for autonomous workflows, intelligent integrations, and self-healing digital infrastructure.",
  alternates: {
    canonical: "/en",
    languages: {
      tr: "/",
      en: "/en",
    },
  },
  openGraph: {
    locale: "en_US",
    title: "Leonardo Tales | AI-Agent Operating System",
    description:
      "Autonomous workflows, intelligent integrations, and self-healing digital infrastructure.",
    url: "/en",
  },
};

export default function EnglishPage() {
  return <HomePage locale="en" />;
}
