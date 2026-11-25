import type { Metadata } from "next";
import { Button } from "@/components/ui";
import { CONTACT_HREF } from "@/lib/site";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[70svh] flex-col items-center justify-center pb-20 pt-32 text-center">
      <p className="display text-[7rem] leading-none text-sky md:text-[10rem]">404</p>
      <h1 className="display mt-4 text-3xl md:text-4xl">This page has been painted over.</h1>
      <p className="mt-4 max-w-md text-ink-soft">The page you are looking for does not exist or has moved. Head back home or request a free quote.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/">Back to home</Button>
        <Button href={CONTACT_HREF} tone="light" className="border border-line">
          Free Quote
        </Button>
      </div>
    </section>
  );
}
