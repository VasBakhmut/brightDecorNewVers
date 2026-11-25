"use client";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { INTRO } from "@/lib/site";

function Word({ w, range, p }: { w: string; range: [number, number]; p: MotionValue<number> }) {
  const color = useTransform(p, range, ["rgba(12,43,69,0.16)", "rgba(12,43,69,1)"]);
  return (
    <motion.span style={{ color }} className="mr-[0.28em] inline-block">
      {w}
    </motion.span>
  );
}

/** Paragraph whose words fill in as you scroll. */
export function Intro() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = INTRO.split(" ");
  return (
    <section aria-label="Introduction" className="wrap py-20 md:py-36">
      <p ref={ref} className="display mx-auto max-w-5xl text-center text-[clamp(1.5rem,3.3vw,3.1rem)] font-semibold leading-[1.2] md:text-left">
        {words.map((w, i) => (
          <Word key={i} w={w} p={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
        ))}
      </p>
    </section>
  );
}
