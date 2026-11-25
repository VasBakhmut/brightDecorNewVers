"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="wrap flex min-h-[70svh] flex-col items-center justify-center pb-20 pt-32 text-center">
      <h1 className="display text-3xl md:text-4xl">Something went wrong.</h1>
      <p className="mt-4 max-w-md text-ink-soft">Please try again. If the problem continues, call us on 0420 750 595.</p>
      <button type="button" onClick={reset} className="mt-8 min-h-12 rounded-xl bg-sky px-6 py-3 font-medium text-white transition-colors hover:bg-sky-deep">
        Try again
      </button>
    </section>
  );
}
