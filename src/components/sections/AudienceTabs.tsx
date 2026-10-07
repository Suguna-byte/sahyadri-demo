"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import clsx from "clsx";
import { audiences } from "@/lib/data";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * WAI-ARIA tabs pattern: roving tabindex, ←/→/Home/End keys, and
 * tabpanel linked by aria-controls. The active pill glides between tabs
 * via a shared layoutId (FLIP animation handled by motion).
 */
export function AudienceTabs() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const current = audiences[active];

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = audiences.length - 1;
    const map: Record<string, number> = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    if (e.key in map) {
      e.preventDefault();
      setActive(map[e.key]);
      tabsRef.current[map[e.key]]?.focus();
    }
  };

  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Who we build for"
            title="One builder, three kinds of client"
            accent={["three"]}
            intro="Whether it's your family home or a 4-lakh sq ft logistics park, the playbook is the same: engineer first, price in writing, report every week."
          />
          <div role="tablist" aria-label="Client type" onKeyDown={onKeyDown} className="flex w-fit max-w-full shrink-0 gap-1 overflow-x-auto rounded-full border border-line bg-paper-2 p-1.5 [scrollbar-width:none]">
            {audiences.map((a, i) => (
              <button
                key={a.id}
                ref={(el) => { tabsRef.current[i] = el; }}
                role="tab"
                id={`tab-${a.id}`}
                aria-selected={i === active}
                aria-controls={`panel-${a.id}`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                className={clsx("relative shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-colors", i === active ? "text-paper" : "text-ink-2 hover:text-ink")}
              >
                {i === active && <motion.span layoutId="audience-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                <span className="relative">{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div id={`panel-${current.id}`} role="tabpanel" aria-labelledby={`tab-${current.id}`} className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:aspect-[4/3] lg:aspect-auto lg:min-h-[560px]">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={current.id}
                initial={{ clipPath: "inset(0 0 0 100%)", scale: 1.1 }}
                animate={{ clipPath: "inset(0 0 0 0%)", scale: 1 }}
                exit={{ opacity: 0.4 }}
                transition={{ duration: 1, ease }}
                className="absolute inset-0"
              >
                <Photo src={current.image} alt="" className="h-full w-full" sizes="(min-width:1024px) 50vw, 100vw" />
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial="hidden"
              animate="show"
              exit="exit"
              variants={{ show: { transition: { staggerChildren: 0.07 } }, exit: { opacity: 0, transition: { duration: 0.2 } } }}
              className="flex flex-col justify-center"
            >
              <motion.h3 variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }} className="display-md">
                {current.title}
              </motion.h3>
              <ul className="mt-10 divide-y divide-line border-y border-line">
                {current.features.map((f) => (
                  <motion.li key={f.title} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }} className="grid gap-2 py-6 sm:grid-cols-[1fr_1.4fr] sm:gap-8">
                    <p className="font-semibold">{f.title}</p>
                    <p className="text-mute leading-relaxed">{f.body}</p>
                  </motion.li>
                ))}
              </ul>
              <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="mt-10">
                <Button href={current.href} variant="dark">Learn more</Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
