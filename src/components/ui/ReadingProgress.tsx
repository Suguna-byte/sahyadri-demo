"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin laterite bar at the top of articles tracking page scroll. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  return <motion.div aria-hidden style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-laterite" />;
}
