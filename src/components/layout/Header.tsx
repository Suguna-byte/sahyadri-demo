"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { nav, site } from "@/lib/site";
import { Logo } from "./Logo";
import { Magnetic } from "@/components/motion/Magnetic";
import { Arrow } from "@/components/ui/Button";

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Hide on scroll-down, reveal on scroll-up: maximises reading space
  // while keeping navigation one flick away.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > prev && y > 160 && !menuOpen && !dropdown);
  });

  // Close menus on navigation.
  useEffect(() => {
    setMenuOpen(false);
    setDropdown(null);
  }, [pathname]);

  // Lock page scroll + Esc to close for the mobile overlay.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const openDrop = (label: string) => {
    clearTimeout(closeTimer.current);
    setDropdown(label);
  };
  const closeDrop = () => {
    closeTimer.current = setTimeout(() => setDropdown(null), 120);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
        Skip to content
      </a>
      <motion.header
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={clsx(
            "transition-[background-color,box-shadow,backdrop-filter] duration-500",
            scrolled || menuOpen ? "bg-paper/85 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl" : "bg-transparent",
          )}
        >
          <div className="container-x flex h-20 items-center justify-between gap-6">
            <Link href="/" aria-label={`${site.name} — home`} className="relative z-10">
              <Logo />
            </Link>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {nav.map((item) => (
                  <li
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => item.children && openDrop(item.label)}
                    onMouseLeave={() => item.children && closeDrop()}
                  >
                    {item.children ? (
                      <button
                        aria-expanded={dropdown === item.label}
                        aria-haspopup="true"
                        onClick={() => setDropdown(dropdown === item.label ? null : item.label)}
                        onKeyDown={(e) => e.key === "Escape" && setDropdown(null)}
                        className={clsx(
                          "flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-laterite",
                          isActive(item.href) && "text-laterite",
                        )}
                      >
                        {item.label}
                        <svg viewBox="0 0 12 12" className={clsx("h-3 w-3 transition-transform duration-300", dropdown === item.label && "rotate-180")} aria-hidden>
                          <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={clsx("relative rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-laterite", isActive(item.href) && "text-laterite")}
                      >
                        {item.label}
                        {isActive(item.href) && (
                          <motion.span layoutId="nav-dot" className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-laterite" />
                        )}
                      </Link>
                    )}

                    <AnimatePresence>
                      {item.children && dropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute left-0 top-full w-[560px] origin-top-left pt-3"
                        >
                          <div className="grid grid-cols-2 gap-1 rounded-3xl border border-line bg-paper p-3 shadow-[0_30px_60px_-20px_rgba(27,26,23,.25)]">
                            {item.children.map((c) => (
                              <Link key={c.href} href={c.href} className="group rounded-2xl p-4 transition-colors hover:bg-paper-2">
                                <span className="flex items-center justify-between text-sm font-semibold">
                                  {c.label}
                                  <Arrow className="text-laterite opacity-0 transition-opacity group-hover:opacity-100" />
                                </span>
                                <span className="mt-1 block text-xs leading-relaxed text-mute">{c.description}</span>
                              </Link>
                            ))}
                            <Link href={item.href} className="col-span-2 mt-1 flex items-center justify-between rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-paper">
                              All services <Arrow />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              <a href={site.phoneHref} className="hidden text-sm font-medium xl:block hover:text-laterite">
                {site.phone}
              </a>
              <div className="hidden sm:block">
                <Magnetic>
                  <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-laterite">
                    Get a quote <Arrow />
                  </Link>
                </Magnetic>
              </div>
              <button
                onClick={() => setMenuOpen((o) => !o)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="relative z-10 grid h-11 w-11 place-items-center rounded-full border border-ink/20 lg:hidden"
              >
                <span className={clsx("absolute h-[1.5px] w-5 bg-ink transition-transform duration-300", menuOpen ? "rotate-45" : "-translate-y-[4px]")} />
                <span className={clsx("absolute h-[1.5px] w-5 bg-ink transition-transform duration-300", menuOpen ? "-rotate-45" : "translate-y-[4px]")} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 overflow-y-auto bg-paper pt-24 lg:hidden"
          >
            <nav aria-label="Mobile" className="container-x pb-16">
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } } }}
                className="divide-y divide-line border-y border-line"
              >
                {[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, ...nav.slice(1), { label: "FAQ", href: "/faq" }, { label: "Contact", href: "/contact" }].map((l) => (
                  <motion.li key={l.href} variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}>
                    <Link href={l.href} className="flex items-center justify-between py-5 font-display text-4xl">
                      {l.label}
                      <Arrow className="text-laterite" />
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
              <div className="mt-10 space-y-2 text-mute">
                <a href={site.phoneHref} className="block text-lg text-ink">{site.phone}</a>
                <a href={`mailto:${site.email}`} className="block">{site.email}</a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
