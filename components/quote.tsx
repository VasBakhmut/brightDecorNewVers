"use client";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { SITE } from "@/lib/site";
import { IconArrow, IconCheck } from "./icons";

const SERVICES = ["Residential", "Commercial", "Body Corporate", "Other"] as const;

type Data = { name: string; phone: string; email: string; service: string; suburb: string; message: string; website: string };
type Errors = Partial<Record<keyof Data, string>>;

const EMPTY: Data = { name: "", phone: "", email: "", service: "", suburb: "", message: "", website: "" };

function validate(d: Data): Errors {
  const e: Errors = {};
  if (!d.name.trim()) e.name = "Please enter your name";
  if (d.phone.replace(/\D/g, "").length < 8) e.phone = "Please enter a valid phone number";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) e.email = "Please enter a valid email";
  if (!d.service) e.service = "Please choose a service";
  return e;
}

function Field({ label, error, id, children }: { label: string; error?: string; id: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-white">
        {label}
      </label>
      {children}
      <p id={`${id}-err`} role={error ? "alert" : undefined} className="min-h-6 pt-1 text-sm font-medium text-white">
        {error && <span className="rounded bg-black/25 px-2 py-0.5">{error}</span>}
      </p>
    </div>
  );
}

export function QuoteForm() {
  const [data, setData] = useState<Data>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const started = useRef(Date.now());

  const set = <K extends keyof Data>(k: K, v: Data[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };
  const aria = (k: keyof Data, id: string) => ({ id, "aria-invalid": errors[k] ? (true as const) : undefined, "aria-describedby": `${id}-err` });

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate(data);
    setErrors(e);
    if (Object.keys(e).length) return;
    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, elapsed: Date.now() - started.current }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Something went wrong");
      }
      setStatus("done");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-light to-sky-deep p-6 text-white shadow-[0_28px_60px_-28px_rgba(10,107,125,0.7)] sm:p-8 md:p-10">
      {/* decorative brush strokes */}
      <svg aria-hidden viewBox="0 0 300 120" className="pointer-events-none absolute -right-10 -top-6 h-32 w-72 text-white/15">
        <path d="M10 90 C 70 20, 150 110, 290 30" fill="none" stroke="currentColor" strokeWidth="14" strokeLinecap="round" />
        <path d="M40 112 C 110 60, 190 120, 300 70" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
      </svg>

      <AnimatePresence mode="wait" initial={false}>
        {status === "done" ? (
          <motion.div key="done" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} role="status" className="relative rounded-2xl bg-white/12 p-7 text-center md:text-left">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-sky md:mx-0">
              <IconCheck className="h-6 w-6" />
            </span>
            <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-bold">Thank you, {data.name.split(" ")[0]}.</h3>
            <p className="mt-2 text-white/90">
              Your request is in. We will be in touch within one business day to arrange your quote. If it is urgent, call {SITE.phone}.
            </p>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} aria-label="Request a quote" className="relative">
            {/* honeypot */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Website
                <input type="text" tabIndex={-1} autoComplete="off" value={data.website} onChange={(e) => set("website", e.target.value)} />
              </label>
            </div>

            <div className="grid gap-x-4 sm:grid-cols-2">
              <Field id="q-name" label="Your name *" error={errors.name}>
                <input className="field" autoComplete="name" value={data.name} onChange={(e) => set("name", e.target.value)} {...aria("name", "q-name")} />
              </Field>
              <Field id="q-phone" label="Phone *" error={errors.phone}>
                <input type="tel" inputMode="tel" className="field" autoComplete="tel" value={data.phone} onChange={(e) => set("phone", e.target.value)} {...aria("phone", "q-phone")} />
              </Field>
              <Field id="q-email" label="Email *" error={errors.email}>
                <input type="email" inputMode="email" className="field" autoComplete="email" value={data.email} onChange={(e) => set("email", e.target.value)} {...aria("email", "q-email")} />
              </Field>
              <Field id="q-service" label="Service required *" error={errors.service}>
                <select className="field" value={data.service} onChange={(e) => set("service", e.target.value)} {...aria("service", "q-service")}>
                  <option value="">Select…</option>
                  {SERVICES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </Field>
              <div className="sm:col-span-2">
                <Field id="q-suburb" label="Suburb (optional)">
                  <input className="field" autoComplete="address-level2" value={data.suburb} onChange={(e) => set("suburb", e.target.value)} id="q-suburb" />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field id="q-msg" label="Project details (optional)">
                  <textarea rows={4} className="field" maxLength={2000} value={data.message} onChange={(e) => set("message", e.target.value)} id="q-msg" />
                </Field>
              </div>
            </div>

            {status === "error" && (
              <p role="alert" className="mb-3 rounded-lg bg-black/25 px-3 py-2 text-sm font-medium">
                {serverError}. Please try again or call {SITE.phone}.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="group flex min-h-13 w-full items-center justify-center gap-3 rounded-xl bg-white px-6 py-3.5 font-semibold text-sky-deep transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-12px_rgba(0,0,0,0.45)] disabled:opacity-70"
            >
              {status === "sending" ? "Sending…" : "Get a free quote"}
              <IconArrow className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <p className="mt-4 text-center text-sm text-white/90">
              Prefer to talk? Call{" "}
              <a href={`tel:${SITE.phoneIntl}`} className="font-semibold underline underline-offset-4">
                {SITE.phone}
              </a>
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
