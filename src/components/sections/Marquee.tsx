import clsx from "clsx";

/**
 * Infinite marquee in pure CSS: content rendered twice and the track
 * translated -50%. Pauses on hover; the duplicate copy is aria-hidden so
 * screen readers hear the list once.
 */
export function Marquee({ items, className, duration = 40 }: { items: string[]; className?: string; duration?: number }) {
  const Row = ({ hidden }: { hidden?: boolean }) => (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center">
      {items.map((t) => (
        <li key={t} className="flex items-center whitespace-nowrap px-8 font-display text-3xl md:text-5xl">
          {t}
          <svg viewBox="0 0 20 20" className="ml-16 h-4 w-4 text-laterite" aria-hidden>
            <path d="M10 0 12.5 7.5 20 10l-7.5 2.5L10 20l-2.5-7.5L0 10l7.5-2.5Z" fill="currentColor" />
          </svg>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={clsx("group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]", className)}>
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]" style={{ ["--marquee-duration" as string]: `${duration}s` }}>
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
