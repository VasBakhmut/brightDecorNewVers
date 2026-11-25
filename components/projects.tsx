"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "@/lib/site";
import { useMedia } from "@/lib/use-media";
import type { PhotoKey } from "@/lib/photos.generated";
import { Photo } from "./photo";
import { SectionLabel } from "./ui";

/**
 * Desktop (≥1024px, mouse): pinned section, vertical scroll drives a horizontal track.
 * Everything else (phones, tablets): plain vertical list. No scroll hijacking.
 */
export function Projects() {
  const wrapRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const pinned = useMedia("(min-width: 1024px) and (hover: hover)");
  const [dist, setDist] = useState(0);

  useEffect(() => {
    if (!pinned) return;
    const measure = () => {
      const t = trackRef.current;
      if (t) setDist(Math.max(0, t.scrollWidth - window.innerWidth + 80));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned]);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (v) => Math.round(-dist * v));

  return (
    <section id="projects" ref={wrapRef} aria-labelledby="projects-title" className="bg-paper-2" style={pinned ? { height: `calc(100svh + ${dist}px)` } : undefined}>
      <div className={pinned ? "sticky top-0 flex h-svh flex-col justify-center overflow-hidden pt-20" : "py-20"}>
        <div className="wrap mb-10 flex items-end justify-center gap-6 text-center md:mb-12 lg:justify-between lg:text-left">
          <div>
            <SectionLabel n="05">Our work</SectionLabel>
            <h2 id="projects-title" className="display mt-4 text-[clamp(2.2rem,5vw,4.6rem)]">
              Selected <span className="text-sky">projects</span>
            </h2>
          </div>
          {pinned && (
            <div className="w-56" aria-hidden>
              <div className="mb-3 flex justify-between text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft">
                <span>Scroll</span>
                <span>{PROJECTS.length} works</span>
              </div>
              <div className="h-0.5 w-full rounded bg-line">
                <motion.div style={{ scaleX: scrollYProgress }} className="h-0.5 origin-left rounded bg-sky" />
              </div>
            </div>
          )}
        </div>

        <div className={pinned ? "px-10" : "wrap"}>
          <motion.ul ref={trackRef} style={pinned ? { x } : undefined} className={pinned ? "flex w-max gap-8" : "grid gap-10 sm:grid-cols-2 sm:gap-x-6"}>
            {PROJECTS.map((p, i) => (
              <li key={p.photo} className={pinned ? "w-[26vw] shrink-0" : ""}>
                <figure className="card group overflow-hidden">
                  <div className={`relative w-full overflow-hidden ${pinned && i % 2 === 0 ? "aspect-[5/6]" : "aspect-[4/5]"}`}>
                    <Photo k={p.photo as PhotoKey} alt={p.alt} sizes="(min-width:1024px) 26vw, (min-width:640px) 45vw, 100vw" className="transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-105" />
                  </div>
                  <figcaption className="flex items-baseline justify-between gap-4 px-5 py-4 text-center lg:text-left">
                    <div className="w-full lg:w-auto">
                      <div className="text-xs font-semibold uppercase tracking-[0.12em] text-sky">{p.cat}</div>
                      <div className="display mt-1 text-xl">{p.title}</div>
                    </div>
                    <div className="hidden text-sm tabular-nums text-ink-soft lg:block">{String(i + 1).padStart(2, "0")}</div>
                  </figcaption>
                </figure>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
