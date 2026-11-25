import { IconAward } from "./icons";
import { Photo } from "./photo";
import { Parallax, Reveal, SectionLabel } from "./ui";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-paper-2 py-20 md:py-36">
      <div className="wrap grid gap-14 md:grid-cols-12 md:items-center md:gap-16">
        <div className="md:col-span-5">
          <Parallax amount={5} className="aspect-[3/4] rounded-3xl">
            <Photo k="max" alt="Max, owner of Bright Decor painting services" sizes="(min-width:768px) 40vw, 100vw" />
          </Parallax>
          <p className="mt-4 text-center text-sm font-medium text-ink-soft md:text-left">Max, Bright Decor</p>
        </div>

        <div className="text-center md:col-span-6 md:col-start-7 md:text-left">
          <SectionLabel n="07">About us</SectionLabel>
          <Reveal>
            <h2 id="about-title" className="display mt-6 text-[clamp(2.2rem,4.6vw,4.4rem)]">
              Hands-on, <span className="text-sky">start to finish</span>.
            </h2>
            <div className="mx-auto mt-7 max-w-xl space-y-5 text-lg text-ink-soft md:mx-0">
              <p>
                Bright Decor is a Brisbane painting business built on over 20 years of hands-on experience. Whether it is a family home, an office or a whole apartment complex, the approach is the same: proper preparation, clear communication and a finish that lasts.
              </p>
              <p>We look after homeowners, businesses and body corporates, from a single feature wall to full exterior repaints and property maintenance.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="card mx-auto mt-10 grid max-w-xl grid-cols-2 overflow-hidden text-left md:mx-0">
            <div className="flex aspect-[4/3] items-center justify-center bg-sky text-white">
              <IconAward className="h-16 w-16 md:h-20 md:w-20" />
            </div>
            <div className="flex flex-col justify-center p-5">
              <div className="display text-3xl text-sky">5-Year</div>
              <div className="mt-1 text-sm font-medium">Workmanship guarantee</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
