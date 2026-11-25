import { SITE } from "@/lib/site";
import { QuoteForm } from "./quote";
import { SectionLabel } from "./ui";

/** Dark contact section: details on the left, form on the right. */
export function QuoteSection() {
  return (
    <section id="quote" aria-labelledby="quote-title" className="bg-ink text-white">
      <div className="wrap grid gap-14 py-20 md:grid-cols-12 md:gap-12 md:py-36">
        <div className="text-center md:col-span-5 md:text-left">
          <SectionLabel n="09" tone="light">
            Free quote
          </SectionLabel>
          <h2 id="quote-title" className="display mt-6 text-[clamp(2.4rem,4.8vw,4.6rem)]">
            Book a <span className="text-sky-light">free</span> quote.
          </h2>
          <p className="mx-auto mt-6 max-w-sm text-white/75 md:mx-0">Tell us about the job and we will come back to you with a detailed, written quote.</p>

          <dl className="mt-12 space-y-7 border-t border-white/20 pt-8">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">Call</dt>
              <dd className="display mt-1 text-3xl">
                <a href={`tel:${SITE.phoneIntl}`} className="transition-opacity hover:opacity-70">
                  {SITE.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">Email</dt>
              <dd className="display mt-1 break-all text-2xl md:text-3xl">
                <a href={`mailto:${SITE.email}`} className="transition-opacity hover:opacity-70">
                  {SITE.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">Visit</dt>
              <dd className="mt-1 text-lg">
                {SITE.address.street}, {SITE.address.suburb} {SITE.address.state} {SITE.address.postcode}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">Business hours</dt>
              <dd className="mt-2 space-y-1">
                {SITE.hours.map((h) => (
                  <div key={h.day} className="mx-auto flex max-w-xs justify-between gap-6 text-white/80 md:mx-0">
                    <span>{h.day}</span>
                    <span className="text-right">{h.time}</span>
                  </div>
                ))}
              </dd>
            </div>
          </dl>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
