/**
 * Mounted from app/template.tsx, which Next re-creates on every
 * navigation, so the animation replays on each route change.
 *
 * Deliberately pure CSS (no JS): the curtain must never be able to stick
 * over the page if hydration is slow or JS fails, and content must be
 * visible to the LCP measurement immediately. Reduced-motion users get a
 * near-instant transition via the global media query in globals.css.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div aria-hidden className="page-curtain" />
      <div className="page-enter">{children}</div>
    </>
  );
}
