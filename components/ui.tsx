"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "motion/react";
import { useId, useRef, type ReactNode } from "react";
import { RAINBOW } from "@/lib/site";
import { IconArrow } from "./icons";

/** Internal link. Always use full paths ("/contact", "/#faq") so it works from any page. */
export function A({ href, children, className = "", onClick, ...rest }: Omit<React.ComponentProps<typeof Link>, "href"> & { href: string }) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={className}
      onClick={(e) => {
        if (href === "/" && pathname === "/") {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return <IconArrow className={className} />;
}

/** Primary teal call-to-action. `tone="light"` is for dark backgrounds. */
export function Button({ href, children, tone = "teal", className = "" }: { href: string; children: ReactNode; tone?: "teal" | "light"; className?: string }) {
  const look = tone === "teal" ? "bg-sky text-white shadow-[0_10px_24px_-10px_rgba(13,129,151,0.7)] hover:bg-sky-deep" : "bg-white text-sky-deep hover:bg-paper-2";
  return (
    <A href={href} className={`group inline-flex min-h-12 items-center gap-3 rounded-xl px-6 py-3 font-medium transition-all duration-300 hover:-translate-y-0.5 ${look} ${className}`}>
      {children}
      <Arrow className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
    </A>
  );
}

/** Hand-drawn rainbow stroke (from the logo) that paints itself in. */
export function Brush({ className = "", delay = 0.9 }: { className?: string; delay?: number }) {
  const id = `g${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox="0 0 420 24" preserveAspectRatio="none" className={className} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
          {RAINBOW.map((c, i) => (
            <stop key={c} offset={i / (RAINBOW.length - 1)} stopColor={c} />
          ))}
        </linearGradient>
      </defs>
      <motion.path
        d="M4 15 C 70 4, 130 22, 205 12 S 330 5, 416 13"
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth="9"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.3, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}

/** Masked line-up reveal for headline lines. */
export function Line({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <span className={`block overflow-hidden pb-[0.12em] -mb-[0.12em] ${className}`}>
      <motion.span className="block" initial={{ y: "108%" }} animate={{ y: 0 }} transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}>
        {children}
      </motion.span>
    </span>
  );
}

/** Fade/translate in once when scrolled into view. */
export function Reveal({ children, delay = 0, y = 24, className = "" }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Image wrapper that drifts slightly against scroll direction. */
export function Parallax({ children, amount = 8, className = "" }: { children: ReactNode; amount?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${amount}%`, `-${amount}%`]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y, scale: 1 + (amount * 2) / 100 + 0.04 }} className="absolute inset-0">
        {children}
      </motion.div>
    </div>
  );
}

/** Small numbered eyebrow: "04 — Specialist work". */
export function SectionLabel({ n, children, tone = "teal" }: { n?: string; children: ReactNode; tone?: "teal" | "light" }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] md:justify-start ${tone === "teal" ? "text-sky" : "text-white/80"}`}>
      {n && <span>{n}</span>}
      {n && <span aria-hidden className="h-px w-8 bg-current opacity-60" />}
      <span>{children}</span>
    </div>
  );
}

/** Section heading with the short teal bar. Centered on phones. */
export function SectionTitle({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <h2 id={id} className={`display h-bar text-center text-[1.9rem] md:text-left md:text-[2.4rem] ${className}`}>
      {children}
    </h2>
  );
}
