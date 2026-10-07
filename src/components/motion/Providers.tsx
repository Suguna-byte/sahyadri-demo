"use client";

import Lenis from "lenis";
import { MotionConfig } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * App-wide client providers:
 *  - MotionConfig reducedMotion="user" makes every motion component honour
 *    the OS "reduce motion" setting automatically.
 *  - Lenis gives inertial smooth scrolling on desktop. It is skipped
 *    entirely for reduced-motion users and on touch devices (native
 *    momentum scrolling is already better there).
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    lenisRef.current = lenis;
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Lenis keeps its own scroll position; reset it on client navigation.
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
