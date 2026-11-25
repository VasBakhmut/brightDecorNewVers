import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FaqList } from "@/components/faq";
import { IconArrow, IconCheck, IconPhone } from "@/components/icons";
import { Photo } from "@/components/photo";
import { A, Button, Reveal, SectionLabel } from "@/components/ui";
import { BUSINESS_ID, JsonLd, breadcrumb, faqSchema } from "@/lib/schema";
import { SERVICE_PAGES, bySlug } from "@/lib/services";
import { CONTACT_HREF, SITE } from "@/lib/site";

export function generateStaticParams() {
  return SERVICE_PAGES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = bySlug((await params).slug);
  if (!s) return {};
  const url = `/services/${s.slug}`;
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title: s.metaTitle, description: s.metaDescription, images: [{ url: "/og.jpg", width: 1200, height: 630 }] },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const s = bySlug((await params).slug);
  if (!s) notFound();
  const path = `/services/${s.slug}`;
  const others = SERVICE_PAGES.filter((o) => o.slug !== s.slug);
  const lower = s.name.toLowerCase();

  return (
    <>
      <section className="wrap pb-16 pt-28 md:pb-24 md:pt-36" aria-labelledby="service-title">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap justify-center gap-2 text-sm text-ink-soft md:justify-start">
          <A href="/" className="hover:text-sky">
            Home
          </A>
          <span aria-hidden>/</span>
          <A href="/#services" className="hover:text-sky">
            Services
          </A>
          <span aria-hidden>/</span>
          <span aria-current="page" className="font-medium text-ink">
            {s.name}
          </span>
        </nav>

        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
          <div className="text-center md:col-span-6 md:text-left">
            <SectionLabel>{s.name} painting</SectionLabel>
            <h1 id="service-title" className="display mt-5 text-[clamp(2.2rem,4.6vw,4.2rem)] leading-[1.08]">
              {s.h1}
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-ink-soft md:mx-0">{s.intro}</p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:justify-start">
              <Button href={CONTACT_HREF}>Free Quote</Button>
              <a href={`tel:${SITE.phoneIntl}`} className="inline-flex min-h-12 items-center gap-2 font-semibold transition-colors hover:text-sky">
                <IconPhone className="h-5 w-5 text-sky" /> {SITE.phone}
              </a>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl md:col-span-6">
            <Photo k={s.hero} alt={s.heroAlt} sizes="(min-width:768px) 50vw, 100vw" priority />
          </div>
        </div>
      </section>

      <section className="bg-paper-2 py-16 md:py-24" aria-labelledby="scope-title">
        <div className="wrap">
          <h2 id="scope-title" className="display h-bar text-center text-[1.9rem] md:text-left md:text-[2.4rem]">
            What our {lower} painting includes
          </h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {s.scope.map((it, i) => (
              <li key={it.title}>
                <Reveal delay={(i % 3) * 0.06} className="h-full">
                  <article className="card h-full p-6 text-center md:text-left">
                    <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-sky/10 text-sky md:mx-0">
                      <IconCheck className="h-5 w-5" />
                    </span>
                    <h3 className="display mt-4 text-xl">{it.title}</h3>
                    <p className="mt-2 text-[0.95rem] text-ink-soft">{it.text}</p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap py-16 md:py-24" aria-labelledby="process-title">
        <h2 id="process-title" className="display h-bar text-center text-[1.9rem] md:text-left md:text-[2.4rem]">
          How we work
        </h2>
        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {s.process.map((p, i) => (
            <li key={p.title} className="border-t-2 border-sky pt-5 text-center md:text-left">
              <div className="display text-3xl text-sky">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="display mt-2 text-xl">{p.title}</h3>
              <p className="mt-2 text-[0.95rem] text-ink-soft">{p.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-paper-2 py-16 md:py-24" aria-labelledby="gallery-title">
        <div className="wrap">
          <h2 id="gallery-title" className="display h-bar text-center text-[1.9rem] md:text-left md:text-[2.4rem]">
            Recent {lower} work
          </h2>
          <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {s.gallery.map((g) => (
              <li key={g.k} className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Photo k={g.k} alt={g.alt} sizes="(min-width:1024px) 22vw, 45vw" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap py-16 md:py-24" aria-labelledby="sfaq-title">
        <div className="grid gap-10 md:grid-cols-12">
          <h2 id="sfaq-title" className="display h-bar text-center text-[1.9rem] md:col-span-4 md:text-left md:text-[2.4rem]">
            {s.name} painting FAQ
          </h2>
          <div className="md:col-span-8">
            <FaqList items={s.faq} />
          </div>
        </div>
      </section>

      <section className="wrap pb-16 md:pb-24" aria-label="Other services">
        <div className="grid gap-5 sm:grid-cols-2">
          {others.map((o) => (
            <A key={o.slug} href={`/services/${o.slug}`} className="card group flex items-center justify-between gap-4 p-6 transition-transform duration-300 hover:-translate-y-1">
              <span>
                <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-sky">Also from Bright Decor</span>
                <span className="display mt-1 block text-2xl">{o.name} painting</span>
              </span>
              <IconArrow className="h-6 w-6 shrink-0 text-sky transition-transform duration-300 group-hover:translate-x-1" />
            </A>
          ))}
        </div>
      </section>

      <section className="bg-ink py-16 text-center text-white md:py-20" aria-label="Request a quote">
        <div className="wrap">
          <h2 className="display text-[clamp(1.9rem,3.6vw,3rem)]">Book a free quote.</h2>
          <p className="mx-auto mt-4 max-w-lg text-white/75">Licensed, insured, 20+ years of experience and a 5-year workmanship guarantee.</p>
          <div className="mt-8 flex justify-center">
            <Button href={CONTACT_HREF} tone="light">
              Free Quote
            </Button>
          </div>
        </div>
      </section>

      <JsonLd
        nodes={[
          {
            "@type": "Service",
            "@id": `${SITE.url}${path}#service`,
            name: `${s.name} painting`,
            serviceType: `${s.name} painting`,
            description: s.metaDescription,
            url: `${SITE.url}${path}`,
            provider: { "@id": BUSINESS_ID },
            areaServed: { "@type": "City", name: "Brisbane" },
          },
          breadcrumb([
            { name: "Home", path: "/" },
            { name: "Services", path: "/#services" },
            { name: `${s.name} painting`, path },
          ]),
          faqSchema(s.faq),
        ]}
      />
    </>
  );
}
