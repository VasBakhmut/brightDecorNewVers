import { SPECIALIST } from "@/lib/site";
import type { PhotoKey } from "@/lib/photos.generated";
import { Photo } from "./photo";
import { Parallax, Reveal, SectionLabel } from "./ui";

export function Specialist() {
  return (
    <section aria-labelledby="specialist-title" className="wrap py-20 md:py-36">
      <SectionLabel n="04">Specialist work</SectionLabel>
      <div className="mt-6 grid gap-6 text-center md:grid-cols-12 md:items-end md:text-left">
        <h2 id="specialist-title" className="display text-[clamp(2.2rem,5vw,4.6rem)] md:col-span-8">
          Beyond a fresh coat of <span className="text-sky">paint</span>.
        </h2>
        <p className="mx-auto max-w-xs text-ink-soft md:col-span-4 md:mx-0 md:justify-self-end">The harder jobs, done properly. Most of them start long before the first brushstroke.</p>
      </div>

      <div className="mt-14 md:mt-20">
        {SPECIALIST.map((s) => (
          <article key={s.n} className="grid gap-8 border-t border-line py-10 md:grid-cols-12 md:gap-10 md:py-14">
            <Reveal className="text-center md:col-span-4 md:text-left">
              <div className="display text-2xl text-sky">{s.n}.</div>
              <h3 className="display mt-4 text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.12]">{s.title}</h3>
              <p className="mx-auto mt-4 max-w-sm text-ink-soft md:mx-0">{s.text}</p>
            </Reveal>
            <div className="grid grid-cols-3 gap-2 md:col-span-8 md:gap-4">
              {s.photos.map(([k, alt], idx) => (
                <Parallax key={k} amount={idx === 1 ? 9 : 5} className={`aspect-[3/4] rounded-2xl ${idx === 1 ? "md:mt-12" : ""}`}>
                  <Photo k={k as PhotoKey} alt={alt} sizes="(min-width:768px) 22vw, 33vw" />
                </Parallax>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
