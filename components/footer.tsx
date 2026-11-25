import { CONTACT_HREF, SERVICES, SITE } from "@/lib/site";
import { Logo } from "./logo";
import { A, Arrow } from "./ui";

const COMPANY = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/#projects" },
  { label: "About Us", href: "/#about" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: CONTACT_HREF },
];

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.14em] text-sky">{title}</h3>
      {children}
    </div>
  );
}

export function Footer() {
  const a = SITE.address;
  return (
    <footer className="relative overflow-hidden border-t border-line bg-paper-2 pb-20 md:pb-0">
      <div className="wrap relative z-10 pb-10 pt-16 md:pt-24">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="flex flex-col items-center text-center md:col-span-4 md:items-start md:text-left">
            <A href="/" aria-label="Bright Decor, home">
              <Logo size="lg" />
            </A>
            <p className="mt-7 max-w-sm text-ink-soft">Licensed, insured painters for homeowners, businesses and body corporates across Brisbane. Over 20 years of hands-on experience.</p>
            <A href={CONTACT_HREF} className="group mt-8 inline-flex min-h-12 items-center gap-3 rounded-xl bg-sky px-6 py-3 font-medium text-white transition-colors hover:bg-sky-deep">
              Free Quote <Arrow className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </A>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 text-center md:col-span-4 md:col-start-6 md:text-left">
            <Col title="Services">
              <ul className="space-y-3">
                {SERVICES.map((s) => (
                  <li key={s.id}>
                    <A href={`/services/${s.slug}`} className="transition-colors hover:text-sky">
                      {s.title}
                    </A>
                  </li>
                ))}
              </ul>
            </Col>
            <Col title="Company">
              <ul className="space-y-3">
                {COMPANY.map((l) => (
                  <li key={l.href}>
                    <A href={l.href} className="transition-colors hover:text-sky">
                      {l.label}
                    </A>
                  </li>
                ))}
              </ul>
            </Col>
          </nav>

          <div className="text-center md:col-span-3 md:text-left">
            <Col title="Contact">
              <address className="space-y-3 not-italic">
                <p>
                  <a href={`tel:${SITE.phoneIntl}`} className="text-lg font-semibold transition-colors hover:text-sky">
                    {SITE.phone}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${SITE.email}`} className="break-all transition-colors hover:text-sky">
                    {SITE.email}
                  </a>
                </p>
                <p className="text-ink-soft">
                  {a.street}
                  <br />
                  {a.suburb} {a.state} {a.postcode}
                </p>
              </address>
              <dl className="mx-auto mt-6 max-w-[17rem] space-y-1 text-sm text-ink-soft md:mx-0">
                {SITE.hours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-4">
                    <dt>{h.day}</dt>
                    <dd className="text-right">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </Col>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-center text-sm text-ink-soft md:mt-24 md:flex-row">
          <span>© {new Date().getFullYear()} Bright Decor. Licensed, insured &amp; QBCC certified.</span>
          <span className="flex gap-5">
            <A href="/privacy-policy" className="transition-colors hover:text-sky">
              Privacy Policy
            </A>
            <A href="/terms" className="transition-colors hover:text-sky">
              Terms
            </A>
          </span>
        </div>
      </div>

      <div aria-hidden className="display pointer-events-none select-none whitespace-nowrap text-center text-[15vw] leading-[0.8] tracking-[-0.03em] text-sky/10">
        Bright Decor
      </div>
    </footer>
  );
}
