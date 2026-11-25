import type { Metadata } from "next";
import { IconClock, IconMail, IconPhone, IconPin } from "@/components/icons";
import { QuoteForm } from "@/components/quote";
import { SectionLabel } from "@/components/ui";
import { JsonLd, breadcrumb } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Free Quote | Brisbane Painters",
  description: "Request a free, no obligation painting quote from Bright Decor. Call 0420 750 595 or send your details and we will come back to you within one business day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const a = SITE.address;
  const rows = [
    {
      icon: IconPhone,
      label: "Call",
      node: (
        <a href={`tel:${SITE.phoneIntl}`} className="font-semibold hover:text-sky">
          {SITE.phone}
        </a>
      ),
    },
    {
      icon: IconMail,
      label: "Email",
      node: (
        <a href={`mailto:${SITE.email}`} className="break-all hover:text-sky">
          {SITE.email}
        </a>
      ),
    },
    {
      icon: IconPin,
      label: "Visit",
      node: (
        <address className="not-italic">
          {a.street}
          <br />
          {a.suburb} {a.state} {a.postcode}
        </address>
      ),
    },
    {
      icon: IconClock,
      label: "Business hours",
      node: (
        <>
          {SITE.hours.map((h) => (
            <p key={h.day} className="text-ink-soft">
              {h.day}: {h.time}
            </p>
          ))}
        </>
      ),
    },
  ];

  return (
    <>
      <section id="quote" aria-labelledby="contact-title" className="wrap pb-20 pt-28 md:pb-28 md:pt-36">
        <div className="grid gap-12 md:grid-cols-12 md:gap-14">
          <div className="text-center md:col-span-5 md:text-left">
            <SectionLabel>Free quote</SectionLabel>
            <h1 id="contact-title" className="display mt-5 text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[1.08]">
              Book a free quote.
            </h1>
            <p className="mx-auto mt-5 max-w-md text-lg text-ink-soft md:mx-0">Tell us about the job and we will come back to you with a detailed, written quote.</p>
            <ul className="mt-10 space-y-6 text-left">
              {rows.map((r) => (
                <li key={r.label} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky/10 text-sky">
                    <r.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft">{r.label}</div>
                    <div className="mt-0.5">{r.node}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-7">
            <QuoteForm />
          </div>
        </div>
      </section>
      <JsonLd
        nodes={[
          { "@type": "ContactPage", url: `${SITE.url}/contact`, name: "Contact Bright Decor" },
          breadcrumb([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
    </>
  );
}
