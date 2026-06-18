import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://leonardotales.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-06-18T00:00:00.000Z");

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          tr: siteUrl,
          en: `${siteUrl}/en`,
        },
      },
    },
    {
      url: `${siteUrl}/en`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          tr: siteUrl,
          en: `${siteUrl}/en`,
        },
      },
    },
    {
      url: `${siteUrl}/manifesto`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          tr: `${siteUrl}/manifesto`,
          en: `${siteUrl}/en/manifesto`,
        },
      },
    },
    {
      url: `${siteUrl}/en/manifesto`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${siteUrl}/manifesto`,
          en: `${siteUrl}/en/manifesto`,
        },
      },
    },
  ];
}
