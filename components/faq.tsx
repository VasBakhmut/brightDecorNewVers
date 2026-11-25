"use client";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { FAQ } from "@/lib/site";
import { SectionLabel } from "./ui";

type Item = { readonly q: string; readonly a: string };

/** Accordion list; reused on service pages. */
export function FaqList({ items }: { items: readonly Item[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div>
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="border-t border-line last:border-b">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-start justify-between gap-8 py-6 text-left"
              >
                <span className="display text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.2] transition-colors group-hover:text-sky">{f.q}</span>
                <span aria-hidden className="relative mt-2 block h-4 w-4 shrink-0 text-sky">
                  <span className="absolute left-0 top-1/2 h-0.5 w-full bg-current" />
                  <span className={`absolute left-1/2 top-0 h-full w-0.5 bg-current transition-transform duration-500 ${isOpen ? "scale-y-0" : ""}`} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-${i}`}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 text-lg text-ink-soft">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="wrap py-20 md:py-36">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="text-center md:col-span-4 md:text-left">
          <SectionLabel n="08">FAQ</SectionLabel>
          <h2 id="faq-title" className="display mt-6 text-[clamp(2.2rem,4.2vw,4rem)]">
            Questions, <span className="text-sky">answered</span>.
          </h2>
        </div>
        <div className="md:col-span-8">
          <FaqList items={FAQ} />
        </div>
      </div>
    </section>
  );
}
