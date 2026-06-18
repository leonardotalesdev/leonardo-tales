import type { Metadata } from "next";

import { ManifestoPage } from "@/components/ManifestoPage";

export const metadata: Metadata = {
  title: "Manifesto | Leonardo Tales",
  description:
    "Leonardo Tales manifestosu: insan, yapay zekâ, sistem, bilinç ve gelecek medeniyetleri üzerine dijital çağ bildirisi.",
  alternates: {
    canonical: "/manifesto",
    languages: {
      tr: "/manifesto",
      en: "/en/manifesto",
    },
  },
};

export default function Page() {
  return <ManifestoPage locale="tr" />;
}
