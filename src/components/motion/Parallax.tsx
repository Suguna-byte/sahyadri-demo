"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";

/**
 * Scroll-linked vertical drift. `speed` is the total travel in px across
 * the element's time in the viewport (negative = moves up faster).
 */
export function Parallax({ children, speed = 80, className }: { children: React.ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [speed / 2, -speed / 2]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
