"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CONTACT_HREF, SITE } from "@/lib/site";
import { IconArrow, IconPhone } from "./icons";
import { A } from "./ui";

/** Sticky call / quote bar on phones. Hides while the quote form is on screen. */
export function MobileCta() {
  const [hide, setHide] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const el = document.getElementById("quote");
    setHide(false);
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setHide(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, [pathname]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-3 border-t border-line bg-paper/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur transition-transform duration-300 md:hidden ${hide ? "translate-y-full" : ""}`}
    >
      <a href={`tel:${SITE.phoneIntl}`} className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-sky font-medium text-sky">
        <IconPhone className="h-5 w-5" />
        Call
      </a>
      <A href={CONTACT_HREF} className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-sky font-medium text-white">
        Free Quote <IconArrow className="h-5 w-5" />
      </A>
    </div>
  );
}
