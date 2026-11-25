import { SERVICES, SITE } from "./site";

export const BUSINESS_ID = `${SITE.url}/#business`;

/** Site-wide structured data (rendered once in the root layout). */
export const siteSchema = [
  {
    "@type": ["HousePainter", "LocalBusiness"],
    "@id": BUSINESS_ID,
    name: SITE.name,
    url: SITE.url,
    image: `${SITE.url}/og.jpg`,
    logo: `${SITE.url}/icons/logo-512.png`,
    telephone: SITE.phoneIntl,
    email: SITE.email,
    description: "Licensed and insured Brisbane painters with over 20 years of experience. Residential, commercial and body corporate painting and property maintenance.",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.suburb,
      addressRegion: SITE.address.state,
      postalCode: SITE.address.postcode,
      addressCountry: "AU",
    },
    areaServed: { "@type": "City", name: "Brisbane" },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "17:00" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Painting services",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: `${s.title} painting`, url: `${SITE.url}/services/${s.slug}` },
      })),
    },
  },
  {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    inLanguage: "en-AU",
    publisher: { "@id": BUSINESS_ID },
  },
];

export const breadcrumb = (items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${SITE.url}${it.path}` })),
});

export const faqSchema = (faq: readonly { q: string; a: string }[]) => ({
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export function JsonLd({ nodes }: { nodes: object[] }) {
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
