"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import type { Project } from "@/lib/data";
import { Photo } from "@/components/ui/Photo";
import { Button, Arrow } from "@/components/ui/Button";

/**
 * Desktop: vertical scroll is converted into horizontal travel. The
 * section is made exactly as tall as the track is wide, and a sticky
 * viewport translates the track — so scroll distance maps 1:1 to pixels.
 * Mobile / reduced motion: a native, swipeable scroll-snap row instead.
 */
export function ProjectsScroller({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [index, setIndex] = useState(1);
  const reduce = useReducedMotion();

  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      setDistance(isDesktop && !reduce ? Math.max(0, trackRef.current.scrollWidth - window.innerWidth) : 0);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [reduce]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  useMotionValueEvent(scrollYProgress, "change", (v) => setIndex(Math.min(projects.length, Math.floor(v * projects.length) + 1)));

  const pinned = distance > 0;

  return (
    <section ref={sectionRef} style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined} className="relative bg-paper-2">
      <div className={pinned ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden" : "py-24"}>
        <div className="container-x mb-8 flex items-end justify-between gap-6 lg:mb-10">
          <div>
            <p className="eyebrow mb-4">Selected work</p>
            <h2 className="display-md max-w-xl lg:text-[clamp(2rem,4.5vh,3.25rem)]">Landmarks across the <em className="text-laterite">Pune region</em></h2>
          </div>
          <div className="hidden items-center gap-6 md:flex">
            {pinned && (
              <p className="font-display text-2xl tabular-nums">
                {String(index).padStart(2, "0")}<span className="text-mute"> / {String(projects.length).padStart(2, "0")}</span>
              </p>
            )}
            <Button href="/projects" variant="outline">All projects</Button>
          </div>
        </div>

        <motion.div
          ref={trackRef}
          style={pinned ? { x } : undefined}
          className={pinned ? "flex w-max gap-6 pl-[max(1rem,calc((100vw_-_1320px)/2_+_2.5rem))] pr-16" : "flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-6 sm:px-8 [scrollbar-width:none]"}
        >
          {projects.map((p, i) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="group relative block w-[82vw] shrink-0 snap-start sm:w-[60vw] lg:w-[min(38vw,46vh)]"
            >
              <Photo src={p.cover} alt={p.title} zoom className="aspect-[4/5] rounded-[1.75rem]" sizes="(min-width:1024px) 46vh, 82vw" />
              <div className="absolute inset-0 rounded-[1.75rem] bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <span className="absolute left-5 top-5 rounded-full bg-paper/90 px-3 py-1 text-xs font-semibold backdrop-blur">{p.category}</span>
              {p.status === "Ongoing" && <span className="absolute right-5 top-5 rounded-full bg-laterite px-3 py-1 text-xs font-semibold text-paper">Ongoing</span>}
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-paper">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-paper/70">{String(i + 1).padStart(2, "0")} · {p.location}</p>
                  <h3 className="mt-2 text-3xl md:text-4xl">{p.title}</h3>
                </div>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-paper text-ink transition-transform duration-500 group-hover:-rotate-45">
                  <Arrow />
                </span>
              </div>
            </Link>
          ))}
        </motion.div>

        {pinned && (
          <div className="container-x mt-10">
            <div className="h-px w-full bg-ink/10">
              <motion.div style={{ width: progress }} className="h-px bg-laterite" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
