"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { processSteps } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

/** Sticky heading + a progress rail that fills as you scroll through the steps. */
export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section className="bg-ink py-24 text-paper md:py-32">
      <div className="container-x grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-32 lg:self-start [&_.text-mute]:text-paper/60">
          <SectionHeading
            eyebrow="How we work"
            title="Five stages. No surprises."
            accent={["No", "surprises."]}
            intro="Every project — a bungalow or a business park — runs on the same documented process, so you always know what happens next and what it costs."
          />
        </div>

        <div ref={ref} className="relative pl-10 md:pl-16">
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-paper/15 md:left-[19px]" />
          <motion.div style={{ scaleY }} className="absolute left-[11px] top-2 bottom-2 w-px origin-top bg-laterite-2 md:left-[19px]" />
          <ol className="space-y-16">
            {processSteps.map((s) => (
              <Reveal as="li" key={s.n} className="relative">
                <span className="absolute -left-10 top-1 grid h-6 w-6 place-items-center rounded-full border border-laterite-2 bg-ink md:-left-16 md:h-10 md:w-10">
                  <span className="h-1.5 w-1.5 rounded-full bg-laterite-2 md:h-2 md:w-2" />
                </span>
                <p className="text-sm font-semibold tabular-nums text-laterite-2">{s.n}</p>
                <h3 className="mt-2 text-3xl md:text-4xl">{s.title}</h3>
                <p className="mt-4 max-w-lg leading-relaxed text-paper/65">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
