"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import clsx from "clsx";

export type AccordionItem = { id: string; title: React.ReactNode; meta?: React.ReactNode; content: React.ReactNode };

/**
 * Accessible disclosure list: real <button>s with aria-expanded /
 * aria-controls, content in a labelled region. Height animates to `auto`
 * (motion measures it), which CSS alone can't do reliably.
 */
export function Accordion({ items, defaultOpen }: { items: AccordionItem[]; defaultOpen?: string }) {
  const [open, setOpen] = useState<string | null>(defaultOpen ?? null);
  const base = useId();

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => {
        const isOpen = open === item.id;
        const btnId = `${base}-${item.id}-btn`;
        const panelId = `${base}-${item.id}-panel`;
        return (
          <div key={item.id}>
            <h3 className="font-sans! text-base! tracking-normal! leading-normal!">
              <button
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.id)}
                className="group flex w-full items-center gap-6 py-6 text-left"
              >
                <span className="flex-1 font-display text-xl md:text-2xl transition-colors group-hover:text-laterite">{item.title}</span>
                {item.meta && <span className="hidden text-sm text-mute md:block">{item.meta}</span>}
                <span
                  aria-hidden
                  className={clsx(
                    "relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line transition-colors duration-300",
                    isOpen ? "bg-ink text-paper border-ink" : "group-hover:border-ink",
                  )}
                >
                  <span className="absolute h-px w-3.5 bg-current" />
                  <span className={clsx("absolute h-3.5 w-px bg-current transition-transform duration-300", isOpen && "scale-y-0")} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 pr-16 text-mute leading-relaxed">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
