"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { img } from "@/lib/images";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Magnetic } from "@/components/motion/Magnetic";

const columns = [
  { shots: [{ src: img.crane, alt: "Tower crane over a building under construction", h: "h-64" }, { src: img.whiteResidence, alt: "Completed white residential building", h: "h-80" }], range: [0, -140] },
  { shots: [{ src: img.crew, alt: "Two site engineers working on a slab", h: "h-80" }, { src: img.glassTower, alt: "Glass office tower", h: "h-64" }, { src: img.interiorWood, alt: "Warm timber interior", h: "h-56" }], range: [-60, 90] },
  { shots: [{ src: img.highrise, alt: "High-rise residential tower seen from below", h: "h-72" }, { src: img.steelFrame, alt: "Steel frame of an industrial building", h: "h-72" }], range: [20, -200] },
] as const;

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  return (
    <section ref={ref} className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
      <div aria-hidden className="blueprint pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_20%_30%,black,transparent_70%)]" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="eyebrow mb-6 flex items-center gap-3"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-laterite opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-laterite" />
            </span>
            Pune · Building since 1999
          </motion.p>

          <SplitHeading
            as="h1"
            immediate
            delay={0.35}
            text="Built on basalt. Handed over on time."
            accent={["basalt", "time"]}
            className="display-xl max-w-[12ch]"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease }}
            className="mt-8 max-w-lg text-lg leading-relaxed text-mute"
          >
            Residential towers, bungalows, offices and industrial sheds across the Pune Metropolitan Region —
            engineered for Deccan soil, priced in writing, and delivered on the date we promise.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.05, ease }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <Button href="/contact">Get a fixed-price quote</Button>
            </Magnetic>
            <Button href="/projects" variant="outline">See our projects</Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="mt-12 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold uppercase tracking-[0.14em] text-mute [&>li]:flex [&>li]:items-center [&>li]:gap-2 [&>li]:before:h-1 [&>li]:before:w-1 [&>li]:before:rounded-full [&>li]:before:bg-laterite [&>li]:before:content-['']"
          >
            <li>ISO 9001</li>
            <li>ISO 45001</li>
            <li>MahaRERA aligned</li>
            <li>10-yr structural warranty</li>
          </motion.ul>
        </div>

        {/* Collage: three columns that drift at different speeds while scrolling */}
        <div className="relative h-[460px] sm:h-[560px] lg:h-[680px]">
          <div className="absolute inset-0 grid grid-cols-3 gap-3 overflow-hidden rounded-[2rem] [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)] sm:gap-4">
            {columns.map((col, i) => (
              <CollageColumn key={i} index={i} progress={scrollYProgress} range={reduce ? [0, 0] : [...col.range]} shots={col.shots} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -4 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ duration: 1, delay: 1.4, ease }}
            className="absolute -left-4 bottom-10 z-10 rounded-2xl bg-ink px-5 py-4 text-paper shadow-2xl sm:-left-8"
          >
            <p className="font-display text-4xl leading-none">97%</p>
            <p className="mt-1 text-xs text-paper/70">handed over on or before<br />the committed date</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CollageColumn({
  shots,
  index,
  progress,
  range,
}: {
  shots: readonly { src: string; alt: string; h: string }[];
  index: number;
  progress: MotionValue<number>;
  range: number[];
}) {
  const y = useTransform(progress, [0, 1], range);
  return (
    <motion.div style={{ y }} className={index === 1 ? "-mt-16 space-y-3 sm:space-y-4" : "space-y-3 sm:space-y-4"}>
      {shots.map((s, j) => (
        <motion.div
          key={s.src}
          initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.15 }}
          animate={{ clipPath: "inset(0% 0 0 0)", scale: 1 }}
          transition={{ duration: 1.3, delay: 0.4 + index * 0.12 + j * 0.15, ease }}
          className="overflow-hidden rounded-2xl"
        >
          <Photo src={s.src} alt={s.alt} className={s.h} sizes="(min-width:1024px) 15vw, 33vw" priority={index === 1 && j === 0} />
        </motion.div>
      ))}
    </motion.div>
  );
}
