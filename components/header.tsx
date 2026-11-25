"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { CONTACT_HREF, NAV, SITE } from "@/lib/site";
import { Logo } from "./logo";
import { IconArrow, IconChevron, IconPhone } from "./icons";
import { A } from "./ui";

export function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 bg-paper transition-shadow duration-300 ${solid || open ? "shadow-[0_6px_24px_-14px_rgba(12,43,69,0.35)]" : ""}`}>
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-6 md:h-20">
        <A href="/" className="shrink-0" aria-label="Bright Decor, home">
          <Logo />
        </A>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <div key={item.label} className="group relative">
              <A href={item.href} className="inline-flex items-center gap-1.5 py-7 text-[0.95rem] font-medium transition-colors hover:text-sky">
                {item.label}
                {"children" in item && <IconChevron className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />}
              </A>
              {"children" in item && (
                <div className="invisible absolute left-1/2 top-[85%] w-56 -translate-x-1/2 translate-y-1 rounded-xl border border-line bg-paper p-2 opacity-0 shadow-[0_18px_40px_-18px_rgba(12,43,69,0.35)] transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {item.children.map((c) => (
                    <A key={c.href} href={c.href} className="block rounded-lg px-4 py-2.5 text-[0.95rem] transition-colors hover:bg-paper-2 hover:text-sky">
                      {c.label}
                    </A>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <a href={`tel:${SITE.phoneIntl}`} className="hidden items-center gap-2 font-semibold transition-colors hover:text-sky lg:flex">
            <IconPhone className="h-5 w-5 text-sky" />
            {SITE.phone}
          </a>
          <A href={CONTACT_HREF} className="group inline-flex items-center gap-2.5 rounded-xl bg-sky px-5 py-3 text-[0.95rem] font-medium text-white transition-colors hover:bg-sky-deep">
            Free Quote
            <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </A>
        </div>

        <button
          type="button"
          className="-mr-2 flex h-11 w-11 items-center justify-center md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="relative block h-3.5 w-6">
            <span className={`absolute left-0 h-0.5 w-full rounded bg-ink transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-1.5 h-0.5 w-full rounded bg-ink transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 h-0.5 w-full rounded bg-ink transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line bg-paper md:hidden"
          >
            <nav aria-label="Mobile" className="wrap py-3 text-center">
              {NAV.map((item) => (
                <div key={item.label} className="border-b border-line py-3 last:border-0">
                  <A href={item.href} onClick={() => setOpen(false)} className="block py-1 text-lg font-semibold">
                    {item.label}
                  </A>
                  {"children" in item && (
                    <div className="mt-1 flex flex-wrap justify-center gap-x-5 gap-y-1 text-ink-soft">
                      {item.children.map((c) => (
                        <A key={c.href} href={c.href} onClick={() => setOpen(false)} className="py-1 text-[0.95rem]">
                          {c.label}
                        </A>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pb-3 pt-4">
                <A href={CONTACT_HREF} onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 rounded-xl bg-sky px-6 py-3.5 font-medium text-white">
                  Free Quote <IconArrow className="h-5 w-5" />
                </A>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
