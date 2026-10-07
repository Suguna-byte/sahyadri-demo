"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Counts up when scrolled into view. Writes straight to textContent via a
 * ref instead of setState, so the count runs at 60fps without
 * re-rendering React on every frame.
 */
export function Counter({ value, decimals = 0, prefix = "", suffix = "" }: { value: number; decimals?: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const format = (n: number) => `${prefix}${n.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;

  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduce) {
      ref.current.textContent = format(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = format(v);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, reduce]);

  // Server-render the final value: correct for no-JS, crawlers and screen readers.
  return <span ref={ref} className="tabular-nums">{format(value)}</span>;
}
