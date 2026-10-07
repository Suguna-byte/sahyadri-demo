"use client";

import { animate, motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { testimonials } from "@/lib/data";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Draggable testimonial rail with momentum. Constraints are measured from
 * the DOM so it works at any width. A custom "Drag" cursor follows the
 * pointer on desktop. Arrow buttons give keyboard / non-drag users the
 * same control.
 */
export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [limit, setLimit] = useState(0);
  const [cursor, setCursor] = useState(false);
  const trackX = useMotionValue(0);
  const cx = useSpring(useMotionValue(0), { stiffness: 400, damping: 30 });
  const cy = useSpring(useMotionValue(0), { stiffness: 400, damping: 30 });

  useLayoutEffect(() => {
    const measure = () => {
      if (!containerRef.current || !trackRef.current) return;
      setLimit(Math.min(0, containerRef.current.offsetWidth - trackRef.current.scrollWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const step = (dir: 1 | -1) => {
    const card = trackRef.current?.firstElementChild as HTMLElement | null;
    const w = (card?.offsetWidth ?? 600) + 24;
    const next = Math.max(limit, Math.min(0, trackX.get() - dir * w));
    animate(trackX, next, { type: "spring", stiffness: 200, damping: 30 });
  };

  return (
    <section className="overflow-hidden py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Client stories" title="We're proud of who we build with" accent={["proud"]} />
          <div className="flex gap-3">
            {([-1, 1] as const).map((d) => (
              <button
                key={d}
                onClick={() => step(d)}
                aria-label={d === 1 ? "Next story" : "Previous story"}
                className="grid h-12 w-12 place-items-center rounded-full border border-ink/20 transition-colors hover:bg-ink hover:text-paper"
              >
                <svg viewBox="0 0 16 16" className={`h-4 w-4 ${d === -1 ? "rotate-180" : ""}`} aria-hidden>
                  <path d="M2 8h11M9 3.5 13.5 8 9 12.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        <div
          ref={containerRef}
          className="relative mt-14 md:cursor-none"
          onPointerMove={(e) => {
            if (e.pointerType !== "mouse") return;
            const r = e.currentTarget.getBoundingClientRect();
            cx.set(e.clientX - r.left);
            cy.set(e.clientY - r.top);
          }}
          onPointerEnter={(e) => e.pointerType === "mouse" && setCursor(true)}
          onPointerLeave={() => setCursor(false)}
        >
          <motion.div
            ref={trackRef}
            drag="x"
            dragConstraints={{ left: limit, right: 0 }}
            dragElastic={0.08}
            style={{ x: trackX }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
            className="flex w-max gap-6"
          >
            {testimonials.map((t) => (
              <article key={t.name} className="grid w-[86vw] shrink-0 select-none overflow-hidden rounded-[2rem] border border-line bg-paper-2 md:w-[880px] md:grid-cols-[0.9fr_1.1fr]">
                <Photo src={t.image} alt={t.project} className="aspect-[4/3] md:aspect-auto md:h-full" sizes="(min-width:768px) 400px, 86vw" />
                <div className="flex flex-col p-8 md:p-10">
                  <svg viewBox="0 0 32 24" className="h-6 w-8 text-laterite" aria-hidden>
                    <path fill="currentColor" d="M0 24V14C0 6 4 1.5 12 0l1.5 3C9 4.5 7 7.4 7 11h6v13H0Zm19 0V14c0-8 4-12.5 12-14l1 3c-4.5 1.5-6.5 4.4-6.5 8H32v13H19Z" />
                  </svg>
                  <blockquote className="mt-6 font-display text-2xl leading-snug md:text-[1.7rem]">{t.quote}</blockquote>
                  <div className="mt-8 mb-2">
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-mute">{t.role} · {t.project}</p>
                  </div>
                  <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-6 md:mt-auto">
                    {t.metrics.map((m) => (
                      <div key={m.label}>
                        <dt className="text-xs uppercase tracking-[0.12em] text-mute">{m.label}</dt>
                        <dd className="mt-1 font-display text-3xl text-laterite">{m.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            ))}
          </motion.div>

          <motion.div aria-hidden style={{ x: cx, y: cy }} className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block">
            <AnimatePresence>
              {cursor && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="-ml-11 -mt-11 grid h-22 w-22 place-items-center rounded-full bg-laterite text-xs font-bold uppercase tracking-[0.18em] text-paper"
                >
                  Drag
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
