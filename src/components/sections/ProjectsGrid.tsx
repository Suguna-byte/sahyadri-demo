"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { projects, projectCategories, type ProjectCategory } from "@/lib/data";
import { Photo } from "@/components/ui/Photo";
import { Arrow } from "@/components/ui/Button";

type Filter = "All" | ProjectCategory;

/**
 * Filter state lives in the URL (?category=Industrial) so filtered views
 * are shareable, back-button friendly and linkable from the footer.
 * Cards animate in/out with shared layout animations (FLIP).
 */
export function ProjectsGrid() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const raw = params.get("category");
  const active: Filter = projectCategories.includes(raw as Filter) ? (raw as Filter) : "All";

  const setActive = (f: Filter) => {
    const q = f === "All" ? "" : `?category=${f}`;
    router.replace(`${pathname}${q}`, { scroll: false });
  };

  return <Grid active={active} onChange={setActive} />;
}

/** Pure view — also used as the Suspense fallback during static render. */
export function Grid({ active, onChange }: { active: Filter; onChange?: (f: Filter) => void }) {
  const list = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
        {projectCategories.map((c) => {
          const count = c === "All" ? projects.length : projects.filter((p) => p.category === c).length;
          return (
            <button
              key={c}
              aria-pressed={active === c}
              onClick={() => onChange?.(c)}
              className={clsx(
                "relative rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors",
                active === c ? "border-ink text-paper" : "border-line hover:border-ink",
              )}
            >
              {active === c && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
              <span className="relative">
                {c} <span className={clsx("ml-1 tabular-nums", active === c ? "text-paper/60" : "text-mute")}>{count}</span>
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">{list.length} projects shown</p>

      <motion.ul layout className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.li
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={clsx(i % 2 === 1 && "md:mt-24")}
            >
              <Link href={`/projects/${p.slug}`} className="group block">
                <div className="relative">
                  <Photo src={p.cover} alt={p.title} zoom className="aspect-[5/4] rounded-[1.75rem]" sizes="(min-width:768px) 50vw, 100vw" />
                  {p.status === "Ongoing" && <span className="absolute right-5 top-5 rounded-full bg-laterite px-3 py-1 text-xs font-semibold text-paper">Ongoing</span>}
                </div>
                <div className="mt-6 flex items-start justify-between gap-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-mute">{p.category} · {p.location} · {p.year}</p>
                    <h2 className="mt-2 text-3xl transition-colors group-hover:text-laterite md:text-4xl">{p.title}</h2>
                    <p className="mt-3 max-w-md text-mute">{p.summary}</p>
                  </div>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line transition-all duration-300 group-hover:border-laterite group-hover:bg-laterite group-hover:text-paper">
                    <Arrow />
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
