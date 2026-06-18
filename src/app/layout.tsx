import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://leonardotales.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Leonardo Tales",
  title: {
    default: "Leonardo Tales | AI-Agent Operating System",
    template: "%s | Leonardo Tales",
  },
  description:
    "Leonardo Tales, yapay zekâ ajanları, otonom iş akışları, akıllı entegrasyonlar ve dijital altyapı sistemleri kuran yeni nesil AI-agent operating system markasıdır.",
  keywords: [
    "Leonardo Tales",
    "yapay zekâ ajanları",
    "AI agents",
    "otonom iş akışları",
    "autonomous workflows",
    "akıllı entegrasyonlar",
    "self-healing infrastructure",
    "multi-agent systems",
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
    siteName: "Leonardo Tales",
    locale: "tr_TR",
    alternateLocale: ["en_US"],
    title: "Leonardo Tales | AI-Agent Operating System",
    description:
      "Yapay zekâ ajanları, otonom iş akışları, akıllı entegrasyonlar ve kendini onaran dijital altyapı sistemleri.",
  },
  twitter: {
    card: "summary",
    title: "Leonardo Tales | AI-Agent Operating System",
    description:
      "AI-agent operating system for autonomous workflows, intelligent integrations, and self-healing digital infrastructure.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
