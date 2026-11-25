"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { CONTACT_HREF } from "@/lib/site";
import { Photo } from "./photo";
import { Brush, Button, Line } from "./ui";

const FACTS = [
  { big: "20+", small: "years on the tools" },
  { big: "5-Year", small: "workmanship guarantee" },
  { big: "QBCC", small: "licensed & insured" },
] as const;

export function Hero() {
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "start 0.15"] });
  const clip = useTransform(scrollYProgress, [0, 1], ["inset(0% 9% 0% 9% round 1.75rem)", "inset(0% 0% 0% 0% round 1.75rem)"]);

  return (
    <section id="top" aria-labelledby="hero-title">
      <div className="wrap pt-28 md:pt-40">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 1 }} className="mb-6 flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-sky md:mb-8 md:justify-start">
          <span>Painters</span>
          <span aria-hidden className="h-px w-8 bg-current opacity-60" />
          <span>Brisbane, Queensland</span>
        </motion.p>

        <h1 id="hero-title" className="display text-center text-[10vw] leading-[1.04] min-[480px]:text-[3.4rem] md:text-left md:text-[clamp(3.4rem,7.6vw,7.4rem)]">
          <Line delay={0.1}>Brisbane painters</Line>
          <Line delay={0.22}>
            you can{" "}
            <span className="relative inline-block text-sky">
              rely on
              <Brush className="absolute -bottom-[0.04em] left-0 h-[0.14em] w-full" />
            </span>
            .
          </Line>
        </h1>

        <div className="mt-10 grid gap-10 text-center md:mt-16 md:grid-cols-12 md:items-end md:text-left">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }} className="md:col-span-5">
            <p className="mx-auto max-w-sm text-xl leading-snug md:mx-0 md:text-2xl">Book a free quote.</p>
            <div className="mt-7 flex justify-center md:justify-start">
              <Button href={CONTACT_HREF}>Free Quote</Button>
            </div>
          </motion.div>

          <motion.ul initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 1, ease: [0.16, 1, 0.3, 1] }} className="card grid grid-cols-3 divide-x divide-line md:col-span-7">
            {FACTS.map((f) => (
              <li key={f.big} className="px-2 py-4 md:px-6 md:py-5">
                <div className="display text-2xl text-sky md:text-4xl">{f.big}</div>
                <div className="mt-1 text-[0.7rem] leading-tight text-ink-soft md:text-sm">{f.small}</div>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>

      <div className="wrap mt-12 md:mt-20">
        <motion.div ref={imgRef} style={{ clipPath: clip }} className="relative h-[62svh] min-h-[22rem] w-full overflow-hidden md:h-[84svh]">
          <Photo k="res-house" alt="Freshly painted modern Queensland home with a white garage door and timber feature columns" sizes="100vw" priority />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/50 to-transparent" />
          <p className="absolute bottom-5 left-6 text-sm font-medium text-white md:bottom-8 md:left-10">Residential exterior, Brisbane</p>
        </motion.div>
      </div>
    </section>
  );
}
