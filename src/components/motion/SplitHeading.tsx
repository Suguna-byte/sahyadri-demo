"use client";

import { motion } from "motion/react";
import clsx from "clsx";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** Words to render in italic accent (exact match). */
  accent?: string[];
  delay?: number;
  /** Animate immediately on mount (hero) instead of on scroll into view. */
  immediate?: boolean;
};

/**
 * Splits a heading into words, each masked by an overflow-hidden wrapper,
 * then slides them up in sequence. The full string stays in an
 * sr-only span so screen readers announce one sentence, not fragments.
 */
export function SplitHeading({ text, as = "h2", className, accent = [], delay = 0, immediate = false }: Props) {
  const Tag = as;
  const words = text.split(" ");
  const trigger = immediate
    ? { initial: "hidden", animate: "show" }
    : { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        className="inline"
        {...trigger}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <motion.span
              className={clsx("inline-block will-change-transform", accent.includes(word.replace(/[.,]/g, "")) && "italic text-laterite")}
              variants={{
                hidden: { y: "110%", rotate: 4 },
                show: { y: "0%", rotate: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && " "}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
