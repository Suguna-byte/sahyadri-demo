import clsx from "clsx";
import { site } from "@/lib/site";

/**
 * Brand mark: the Sahyadri ridge-line cut by two horizontal "slab" lines —
 * mountains made of floors. Pure SVG + live text so it stays crisp at any
 * size and inherits colour for light/dark placements.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={clsx("h-9 w-9 shrink-0", className)} aria-hidden>
      <rect width="40" height="40" rx="10" className="fill-laterite" />
      <path d="M6.5 30.5 15.5 13l5.2 9.4 4.6-7.9 8.2 16Z" className="fill-paper" />
      <rect x="6" y="23.4" width="28" height="1.7" className="fill-laterite" />
      <rect x="6" y="26.9" width="28" height="1.7" className="fill-laterite" />
    </svg>
  );
}

export function Logo({ tone = "ink", className }: { tone?: "ink" | "paper"; className?: string }) {
  return (
    <span className={clsx("inline-flex items-center gap-3", tone === "paper" ? "text-paper" : "text-ink", className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.35rem] tracking-tight">{site.shortName}</span>
        <span className="mt-1 text-[0.6rem] font-bold tracking-[0.32em] opacity-70">BUILDCON</span>
      </span>
    </span>
  );
}
