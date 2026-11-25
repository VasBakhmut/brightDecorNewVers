import { SERVICES } from "@/lib/site";
import type { PhotoKey } from "@/lib/photos.generated";
import { IconArrow, IconCheck } from "./icons";
import { Photo } from "./photo";
import { A } from "./ui";

const SKINS = [
  { bg: "bg-paper-2 text-ink", sub: "text-ink-soft", num: "text-sky", btn: "bg-sky text-white hover:bg-sky-deep", check: "text-sky" },
  { bg: "bg-ink text-white", sub: "text-white/75", num: "text-sky-light", btn: "bg-white text-ink hover:bg-paper-2", check: "text-sky-light" },
  { bg: "bg-sky text-white", sub: "text-white/90", num: "text-white", btn: "bg-white text-sky-deep hover:bg-paper-2", check: "text-white" },
] as const;

/** Three full-height panels that stack as you scroll (desktop). Plain blocks on phones. */
export function Services() {
  return (
    <section id="services" aria-label="Our services">
      {SERVICES.map((s, i) => {
        const k = SKINS[i];
        return (
          <div key={s.id} className={`md:sticky md:top-0 md:h-svh ${k.bg}`}>
            <div className="wrap grid h-full gap-10 py-16 md:grid-cols-12 md:items-center md:gap-14 md:pb-16 md:pt-28">
              <div className="text-center md:col-span-5 md:text-left">
                <div className={`display text-6xl md:text-8xl ${k.num}`}>{s.n}</div>
                <h2 className="display mt-4 text-[clamp(2.4rem,4.6vw,4.4rem)]">{s.title}</h2>
                <p className={`mx-auto mt-5 max-w-md text-lg ${k.sub} md:mx-0`}>{s.lead}</p>
                <ul className="mx-auto mt-7 max-w-md space-y-2.5 text-left">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <IconCheck className={`mt-1 h-4 w-4 shrink-0 ${k.check}`} />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <A href={`/services/${s.slug}`} className={`group mt-8 inline-flex min-h-12 items-center gap-3 rounded-xl px-6 py-3 font-medium transition-all duration-300 hover:-translate-y-0.5 ${k.btn}`}>
                  {s.title} painting
                  <IconArrow className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </A>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl md:col-span-7 md:aspect-auto md:h-[70svh]">
                <Photo k={s.photo as PhotoKey} alt={s.alt} sizes="(min-width:768px) 56vw, 100vw" />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
