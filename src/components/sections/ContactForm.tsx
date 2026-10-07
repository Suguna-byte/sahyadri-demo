"use client";

import { useActionState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { submitEnquiry, type ContactState } from "@/app/contact/actions";

const types = ["Bungalow / villa", "Residential tower", "Commercial building", "Industrial / warehouse", "Interiors", "Renovation / retrofit"];
const serviceToType: Record<string, string> = {
  "residential-construction": "Bungalow / villa",
  "commercial-buildings": "Commercial building",
  "industrial-warehousing": "Industrial / warehouse",
  "interiors-fitouts": "Interiors",
  "renovation-retrofitting": "Renovation / retrofit",
};

export function ContactFormWithParams() {
  const service = useSearchParams().get("service") ?? "";
  return <ContactForm defaultType={serviceToType[service] ?? ""} />;
}

export function ContactForm({ defaultType = "" }: { defaultType?: string }) {
  const [state, action, pending] = useActionState<ContactState, FormData>(submitEnquiry, { status: "idle" });
  const v = state.values ?? {};
  const err = state.errors ?? {};
  const formRef = useRef<HTMLFormElement>(null);

  // On a failed submit, move focus to the first invalid field (WCAG 3.3.1).
  useEffect(() => {
    if (state.status !== "error") return;
    const selector = state.errors?.type ? "fieldset input" : '[aria-invalid="true"]';
    formRef.current?.querySelector<HTMLElement>(selector)?.focus();
  }, [state]);

  return (
    <AnimatePresence mode="wait">
      {state.status === "success" ? (
        <motion.div
          key="ok"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          role="status"
          className="flex min-h-[520px] flex-col items-center justify-center rounded-[2rem] bg-ink p-10 text-center text-paper"
        >
          <motion.svg viewBox="0 0 52 52" className="h-20 w-20 text-laterite-2">
            <motion.circle cx="26" cy="26" r="24" fill="none" stroke="currentColor" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
            <motion.path d="M15 27l7 7 15-15" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.7 }} />
          </motion.svg>
          <h2 className="display-md mt-8">Enquiry received</h2>
          <p className="mt-4 max-w-sm text-paper/75">{state.message}</p>
        </motion.div>
      ) : (
        <motion.form ref={formRef} key="form" action={action} exit={{ opacity: 0, y: -10 }} noValidate className="rounded-[2rem] border border-line bg-paper p-6 md:p-10">
          {state.status === "error" && (
            <p role="alert" className="mb-6 rounded-xl bg-laterite/10 px-4 py-3 text-sm font-medium text-laterite">{state.message}</p>
          )}

          <fieldset>
            <legend className="mb-4 text-sm font-semibold">What are you building? <span className="text-laterite">*</span></legend>
            <div className="flex flex-wrap gap-2" aria-describedby={err.type ? "type-err" : undefined}>
              {types.map((t) => (
                <label key={t} className="cursor-pointer">
                  <input type="radio" name="type" value={t} defaultChecked={(v.type || defaultType) === t} className="peer sr-only" />
                  <span className="inline-block rounded-full border border-line px-4 py-2 text-sm transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-laterite hover:border-ink">
                    {t}
                  </span>
                </label>
              ))}
            </div>
            {err.type && <p id="type-err" className="mt-2 text-sm text-laterite">{err.type}</p>}
          </fieldset>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Field name="name" label="Full name" required autoComplete="name" defaultValue={v.name} error={err.name} />
            <Field name="phone" label="Mobile" required type="tel" autoComplete="tel" inputMode="tel" placeholder="98XXX XXXXX" defaultValue={v.phone} error={err.phone} />
            <Field name="email" label="Email" type="email" autoComplete="email" defaultValue={v.email} error={err.email} />
            <Field name="location" label="Site location" placeholder="e.g. Baner, Chakan MIDC" defaultValue={v.location} />
            <div className="md:col-span-2">
              <label htmlFor="budget" className="mb-2 block text-sm font-semibold">Indicative budget</label>
              <select id="budget" name="budget" defaultValue={v.budget ?? ""} className="w-full appearance-none rounded-xl border border-line bg-paper-2/50 px-4 py-3.5 focus:border-ink focus:outline-none">
                <option value="">Prefer not to say</option>
                <option>Under ₹1 crore</option>
                <option>₹1 – 5 crore</option>
                <option>₹5 – 25 crore</option>
                <option>₹25 crore +</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="message" className="mb-2 block text-sm font-semibold">Tell us about the project <span className="text-laterite">*</span></label>
              <textarea
                id="message"
                name="message"
                rows={5}
                defaultValue={v.message}
                aria-invalid={!!err.message}
                aria-describedby={err.message ? "message-err" : undefined}
                className={clsx("w-full resize-y rounded-xl border bg-paper-2/50 px-4 py-3.5 focus:border-ink focus:outline-none", err.message ? "border-laterite" : "border-line")}
                placeholder="Plot size, number of floors, timeline, anything else…"
              />
              {err.message && <p id="message-err" className="mt-2 text-sm text-laterite">{err.message}</p>}
            </div>
          </div>

          {/* Honeypot */}
          <div aria-hidden className="absolute -left-[9999px]">
            <label>Website <input name="company_website" tabIndex={-1} autoComplete="off" /></label>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-mute">We&apos;ll only use your details to respond to this enquiry.</p>
            <button
              type="submit"
              disabled={pending}
              className="inline-flex items-center justify-center gap-3 rounded-full bg-laterite px-7 py-4 text-sm font-semibold text-paper transition-colors hover:bg-ink disabled:opacity-70"
            >
              {pending && <span className="h-4 w-4 animate-spin rounded-full border-2 border-paper/40 border-t-paper" aria-hidden />}
              {pending ? "Sending…" : "Send enquiry"}
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function Field({
  name,
  label,
  error,
  required,
  ...rest
}: { name: string; label: string; error?: string; required?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-semibold">
        {label} {required && <span className="text-laterite">*</span>}
      </label>
      <input
        id={name}
        name={name}
        aria-invalid={!!error}
        aria-required={required}
        aria-describedby={error ? `${name}-err` : undefined}
        className={clsx("w-full rounded-xl border bg-paper-2/50 px-4 py-3.5 placeholder:text-mute/60 focus:border-ink focus:outline-none", error ? "border-laterite" : "border-line")}
        {...rest}
      />
      {error && <p id={`${name}-err`} className="mt-2 text-sm text-laterite">{error}</p>}
    </div>
  );
}
