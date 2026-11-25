import Image from "next/image";

/**
 * Horizontal logo lockup: roller mark + wordmark + tagline.
 * Built in markup (not a flat image) so it stays sharp at every size.
 */
export function Logo({ className = "", size = "md" }: { className?: string; size?: "md" | "lg" }) {
  const lg = size === "lg";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image src="/img/mark.png" alt="" width={428} height={378} priority={!lg} className={lg ? "h-14 w-auto" : "h-10 w-auto md:h-11"} />
      <span className="flex flex-col leading-none">
        <span className={`font-[family-name:var(--font-display)] font-bold tracking-tight text-ink ${lg ? "text-[2rem]" : "text-[1.4rem] md:text-[1.6rem]"}`}>Bright Decor</span>
        <span className={`mt-1.5 font-semibold uppercase tracking-[0.2em] text-sky ${lg ? "text-[0.62rem]" : "text-[0.5rem] md:text-[0.55rem]"}`}>Painting &amp; Property Maintenance</span>
      </span>
    </span>
  );
}
