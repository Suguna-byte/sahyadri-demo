import Link from "next/link";
import clsx from "clsx";

type Variant = "primary" | "dark" | "outline" | "ghost" | "light";

const styles: Record<Variant, string> = {
  primary: "bg-laterite text-paper hover:bg-ink",
  dark: "bg-ink text-paper hover:bg-laterite",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  ghost: "text-ink px-0! hover:text-laterite",
  light: "bg-paper text-ink hover:bg-laterite hover:text-paper",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
};

/**
 * Server component — a styled Link. The arrow slides on hover using a
 * pure-CSS group transition, so buttons cost zero client JS.
 */
export function Button({ href, children, variant = "primary", className, arrow = true }: Props) {
  const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  const cls = clsx(
    "group inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-semibold tracking-tight transition-colors duration-300",
    styles[variant],
    className,
  );
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <Arrow />}
    </>
  );
  return external ? (
    <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <span aria-hidden className={clsx("relative inline-flex h-4 w-4 overflow-hidden", className)}>
      <svg viewBox="0 0 16 16" className="absolute inset-0 h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-5">
        <path d="M2 8h11M9 3.5 13.5 8 9 12.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg viewBox="0 0 16 16" className="absolute inset-0 h-4 w-4 -translate-x-5 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-0">
        <path d="M2 8h11M9 3.5 13.5 8 9 12.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
