"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

/** Optimistic newsletter form — swap the timeout for a real API route. */
export function Newsletter() {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  return (
    <div className="mt-8 max-w-md">
      <AnimatePresence mode="wait" initial={false}>
        {state === "done" ? (
          <motion.p
            key="done"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-full border border-paper/20 px-6 py-4 text-paper/80"
            role="status"
          >
            You&apos;re on the list. First issue lands next month.
          </motion.p>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0, y: -8 }}
            onSubmit={(e) => {
              e.preventDefault();
              setState("loading");
              setTimeout(() => setState("done"), 700);
            }}
            className="flex rounded-full border border-paper/25 p-1.5 focus-within:border-paper/60"
          >
            <label htmlFor="nl-email" className="sr-only">Email address</label>
            <input
              id="nl-email"
              type="email"
              required
              placeholder="you@company.com"
              className="min-w-0 flex-1 bg-transparent px-4 text-paper placeholder:text-paper/40 focus:outline-none"
            />
            <button disabled={state === "loading"} className="rounded-full bg-paper px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-laterite hover:text-paper disabled:opacity-60">
              {state === "loading" ? "…" : "Subscribe"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
