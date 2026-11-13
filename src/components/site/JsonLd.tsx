import { expertise, experience, faqs, hero, profile, projects } from "@/data/content";
import { siteUrl } from "@/data/site";

/** Structured data for search engines, built from the same content the page renders. */
export default function JsonLd() {
  const personId = `${siteUrl}/#person`;
  const current = experience.find((e) => e.current);
  const [locality, region] = profile.location.split(",").map((s) => s.trim());

  const graph = [
    {
      "@type": "Person",
      "@id": personId,
      name: profile.name,
      alternateName: profile.shortName,
      url: siteUrl,
      image: `${siteUrl}${profile.photo}`,
      jobTitle: current?.role ?? "Software Engineer",
      description: hero.intro,
      email: `mailto:${profile.email}`,
      telephone: profile.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: locality,
        addressRegion: region,
        addressCountry: profile.country,
      },
      sameAs: profile.socials.map((s) => s.href),
      ...(current ? { worksFor: { "@type": "Organization", name: current.company } } : {}),
      knowsAbout: expertise.map((e) => e.title),
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: profile.name,
      description: profile.role,
      inLanguage: "en",
      publisher: { "@id": personId },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/#work`,
      name: "Apps built and shipped",
      itemListElement: projects.map((p, i) => {
        const stores = [p.android, p.ios].filter((u): u is string => Boolean(u));
        return {
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "SoftwareApplication",
            name: p.title,
            description: `${p.problem} ${p.summary}`,
            applicationCategory: p.sector,
            operatingSystem: [p.android && "Android", p.ios && "iOS"].filter(Boolean).join(", "),
            image: `${siteUrl}${p.icon}`,
            ...(stores.length ? { installUrl: stores[0], sameAs: stores } : {}),
            author: { "@id": personId },
          },
        };
      }),
    },
  ];

  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
