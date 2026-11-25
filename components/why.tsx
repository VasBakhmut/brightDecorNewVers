"use client";
import { motion } from "motion/react";
import { BRANDS, WHY } from "@/lib/site";
import { Reveal, SectionLabel } from "./ui";

export function Why() {
  const brands = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS];
  return (
    <section aria-labelledby="why-title" className="py-20 md:py-36">
      <div className="wrap grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="text-center md:sticky md:top-32 md:text-left">
            <SectionLabel n="06">Why clients choose us</SectionLabel>
            <h2 id="why-title" className="display mt-6 text-[clamp(2.2rem,4.6vw,4.4rem)]">
              Why clients choose <span className="text-sky">Bright Decor</span>
            </h2>
            <div className="mt-10 flex items-end justify-center gap-5 md:justify-start">
              <span className="display text-[clamp(5.5rem,13vw,11rem)] leading-[0.85] text-sky">20+</span>
              <span className="pb-3 text-sm font-medium leading-tight text-ink-soft">
                years of
                <br />
                hands-on work
              </span>
            </div>
          </div>
        </div>

        <ol className="md:col-span-7">
          {WHY.map((w, i) => (
            <li key={w.n} className="relative pb-12 pt-8 md:pb-16">
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                transition={{ duration: 1.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-x-0 top-0 h-px origin-left bg-ink/25"
              />
              <Reveal className="grid gap-4 text-center md:grid-cols-[5rem_1fr] md:text-left">
                <span className="display text-2xl text-sky">{w.n}</span>
                <div>
                  <h3 className="display text-[clamp(1.6rem,2.8vw,2.6rem)] leading-[1.1]">{w.title}</h3>
                  <p className="mx-auto mt-4 max-w-lg text-ink-soft md:mx-0">{w.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-20 border-y border-line bg-paper-2 py-7 md:mt-28" aria-label="Paint brands we use">
        <div className="marquee overflow-hidden">
          <div className="marquee-track flex w-max items-center gap-14 pr-14">
            {brands.map((b, i) => (
              <span key={i} aria-hidden={i >= BRANDS.length} className="flex items-center gap-14">
                <span className="display text-4xl md:text-6xl">{b}</span>
                <span aria-hidden className="h-2 w-2 rounded-full bg-sky/50" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
