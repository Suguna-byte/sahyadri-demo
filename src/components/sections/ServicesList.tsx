"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useState } from "react";
import { services } from "@/lib/data";
import { Arrow } from "@/components/ui/Button";

/**
 * Index-style list of services. On desktop, a photo preview follows the
 * cursor (spring-smoothed motion values → no re-render per mousemove).
 * On touch, each row shows its own thumbnail instead.
 */
export function ServicesList() {
  const [hovered, setHovered] = useState<number | null>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 28, mass: 0.6 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 28, mass: 0.6 });

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      onPointerLeave={() => setHovered(null)}
    >
      <ul className="border-t border-ink/15">
        {services.map((s, i) => (
          <li key={s.slug} onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(i)}>
            <Link
              href={`/services/${s.slug}`}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-ink/15 py-7 md:grid-cols-[4rem_1fr_1fr_auto] md:gap-8 md:py-9"
            >
              <span className="text-sm font-semibold text-mute tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-3xl transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-3 group-hover:text-laterite md:text-5xl">
                {s.title}
              </span>
              <span className="hidden text-mute md:block">{s.kicker} — {s.idealFor}</span>
              <span className="grid h-12 w-12 place-items-center rounded-full border border-ink/20 transition-colors duration-300 group-hover:border-laterite group-hover:bg-laterite group-hover:text-paper">
                <Arrow />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block"
      >
        <AnimatePresence>
          {hovered !== null && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative -ml-36 -mt-48 h-56 w-72 overflow-hidden rounded-2xl shadow-2xl"
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={hovered}
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-30%" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image src={services[hovered].image} alt="" fill sizes="288px" className="object-cover" />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
