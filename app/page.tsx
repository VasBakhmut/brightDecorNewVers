import { About } from "@/components/about";
import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import { Intro } from "@/components/intro";
import { Projects } from "@/components/projects";
import { QuoteSection } from "@/components/quote-section";
import { Services } from "@/components/services";
import { Specialist } from "@/components/specialist";
import { Why } from "@/components/why";
import { JsonLd, faqSchema } from "@/lib/schema";
import { FAQ } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Services />
      <Specialist />
      <Projects />
      <Why />
      <About />
      <Faq />
      <QuoteSection />
      <JsonLd nodes={[faqSchema(FAQ)]} />
    </>
  );
}
