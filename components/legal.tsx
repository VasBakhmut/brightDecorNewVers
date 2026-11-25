import type { ReactNode } from "react";

/** Plain readable layout for policy pages. */
export function Legal({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <article className="wrap max-w-3xl pb-20 pt-28 md:pb-28 md:pt-36">
      <h1 className="display h-bar text-center text-[2.2rem] md:text-left md:text-[3rem]">{title}</h1>
      <p className="mt-4 text-center text-sm text-ink-soft md:text-left">Last updated: {updated}</p>
      <div className="mt-10 space-y-5 text-[1.02rem] text-ink-soft [&_a]:text-sky [&_a]:underline [&_h2]:mt-10 [&_h2]:font-[family-name:var(--font-display)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-ink [&_li]:ml-5 [&_li]:list-disc">
        {children}
      </div>
    </article>
  );
}
