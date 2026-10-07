# Frontend Technical Decisions — Sahyadri Buildcon

A marketing site for a Pune construction company, built as an interview showcase.
Design direction was taken from the *structure* of sparkadvisors.com (editorial serif
hero + photo collage, stat strip, audience tabs, services, testimonial rail, news,
heavy footer) and re-expressed with an original brand, copy, palette and interactions.

---

## 1. Stack at a glance

| Concern | Choice | Why |
|---|---|---|
| Framework | **Next.js 16, App Router** | Server Components by default, file-based routing, built-in SSG, metadata API, image & font optimisation. |
| Language | **TypeScript (strict)** | Content types (`Project`, `Service`, `Post`) are the contract between data and UI. |
| Styling | **Tailwind CSS v4** (CSS-first `@theme`) | Design tokens live in one CSS file; no JS config; zero runtime cost. |
| Animation | **Motion** (`motion/react`, formerly Framer Motion) | Declarative, spring physics, scroll-linked motion values, layout (FLIP) animations, `AnimatePresence` for exits. |
| Smooth scroll | **Lenis** | Inertial wheel scrolling that stays compatible with native `position: sticky` and scroll events. |
| Fonts | **Fraunces + Manrope**, self-hosted via `next/font/local` | No Google request at build or runtime; still preloaded with size-adjusted fallbacks. |
| Utilities | `clsx` | Only conditional class joining — kept dependency count tiny (8 runtime deps, 2 of them font files). |

---

## 2. Rendering strategy

- **Everything is statically generated.** 31 routes are prerendered at build time.
  Dynamic routes (`/services/[slug]`, `/projects/[slug]`, `/insights/[slug]`) use
  `generateStaticParams` with `dynamicParams = false`, so an unknown slug is a real 404,
  not an on-demand render.
- **Server Components by default; client components only at the leaves.** Pages,
  layouts, footer, buttons, cards and the marquee are server components. `"use client"`
  is limited to things that genuinely need the browser: the header (scroll state, menus),
  animation wrappers, tabs, carousel, filters and the form. This keeps the JS bundle
  proportional to interactivity, not to page size.
- **Composition pattern:** server pages pass plain data into small client islands
  (e.g. `<ProjectsScroller projects={projects.slice(0, 6)} />`), so data never needs an
  API round-trip.
- **`template.tsx` vs `layout.tsx`:** the header/footer live in the layout (persist across
  navigations, keep their state). The route transition lives in `template.tsx`, which
  Next re-mounts on every navigation — exactly what a replaying transition needs.

---

## 3. Content layer

- All content is typed and centralised in `src/lib/data.ts`, `site.ts` and `images.ts`.
- Components never hard-code copy or URLs; **re-branding is three files**
  (`site.ts`, `Logo.tsx`, the `@theme` block in `globals.css`).
- The types are deliberately CMS-shaped. Moving to Sanity/Payload/Contentful means
  replacing the arrays with fetchers that return the same types, plus `revalidate`
  (ISR) or on-demand revalidation via webhook.

---

## 4. Design system

- **Tokens in CSS (`@theme`)**: palette is drawn from the Deccan — *basalt* ink,
  *laterite* accent, *limewash* paper, *monsoon* green. Tailwind generates utilities
  (`bg-laterite`, `text-ink`) from them automatically.
- **Fluid type** via `clamp()` (`.display-xl/lg/md`) — headings scale smoothly between
  breakpoints instead of jumping.
- **Primitives**: `Button` (server, CSS-only arrow animation), `Photo` (aspect-ratio frame
  + `next/image fill`), `SectionHeading`, `Accordion`, `Breadcrumbs`.
- **Brand mark** is an inline SVG (Sahyadri ridge-line cut by two "slab" lines) so it's
  crisp at any size and themeable via `fill-*` classes. Same SVG is the favicon
  (`app/icon.svg`).

---

## 5. Animation architecture

Principle: **animate only `transform`, `opacity` and `clip-path`** — properties the
browser composites on the GPU without triggering layout or paint.

| Effect | Where | Technique |
|---|---|---|
| Route transition | every page | **Pure CSS** curtain + rise in `template.tsx`. Chosen over JS so it can never get stuck over the page if hydration is slow, and doesn't delay LCP. |
| Masked word reveal | all headings | `SplitHeading` splits words into overflow-hidden masks with staggered variants. Full sentence kept in an `sr-only` span so screen readers read it once. |
| Scroll reveals | everywhere | `Reveal` / `RevealGroup` use `whileInView` + `viewport.once` — IntersectionObserver under the hood, not scroll listeners. |
| Hero collage | home | Three columns drift at different speeds via `useScroll` → `useTransform`; images enter with a `clip-path` wipe. |
| Count-up stats | stats band | `animate()` writes directly to `textContent` via a ref — **no React re-render per frame**. Server renders the final number (correct for SEO/no-JS). |
| Audience tabs | home | Shared `layoutId` pill (FLIP), `AnimatePresence` crossfades the image with a clip reveal. |
| Cursor-follow preview | services list | Spring-smoothed motion values; pointer-type check so it's inert on touch. |
| Scroll progress rail | process | `useScroll` + `useSpring` drives `scaleY` of a 1px line. |
| Horizontal pinned gallery | selected projects | Section height = viewport + track overflow; a sticky viewport translates the track, so vertical scroll maps 1:1 to horizontal pixels. Measured with `ResizeObserver`. Falls back to native scroll-snap on mobile/reduced motion. |
| Drag carousel | testimonials | `drag="x"` with constraints measured from the DOM, momentum, custom "Drag" cursor; arrow buttons for keyboard users. |
| Filter grid | projects | `layout` + `AnimatePresence mode="popLayout"` for re-flowing cards. |
| Magnetic CTAs | header/hero | Springs on motion values; pointer-only. |
| Infinite marquee | client types | Pure CSS keyframes; pauses on hover; duplicate row `aria-hidden`. |
| Success state | contact | SVG `pathLength` draw-on checkmark. |

**Performance guard-rails**
- Motion values instead of React state for anything per-frame (cursor, scroll, counters).
- `optimizePackageImports: ["motion"]` tree-shakes the motion barrel.
- `will-change` used only on the word masks while they animate.

**Reduced motion**
- `<MotionConfig reducedMotion="user">` makes every Motion animation respect the OS
  setting automatically.
- Parallax, collage drift and the pinned horizontal gallery explicitly disable themselves
  via `useReducedMotion()`.
- A global `prefers-reduced-motion` media query neutralises CSS animations.
- Lenis is not initialised for reduced-motion **or** coarse-pointer (touch) users —
  native momentum scrolling is better there.

---

## 6. Performance

- **SSG + CDN** → TTFB is a static file.
- **Images**: `next/image` with `fill` inside fixed-aspect frames (reserves space →
  CLS ≈ 0), responsive `sizes` on every image, AVIF/WebP, lazy by default, `priority`
  only on the LCP candidate in each hero.
- **Fonts**: `next/font/local` → preloaded, `display: swap`, automatic metric-matched
  fallback to prevent layout shift on swap.
- **JS**: interactive islands only; buttons, cards, footer, marquee and breadcrumbs ship
  zero client JS.
- **Known trade-off:** below-the-fold `whileInView` content starts at `opacity: 0` in the
  SSR HTML. Search engines still read it (it's in the DOM), but it is invisible without JS.
  The hero headline and route transition avoid this; a stricter build could gate reveal
  styles behind a `.js` class on `<html>`.

---

## 7. Accessibility

- Skip-to-content link, landmark elements (`header`, `nav`, `main`, `footer`), one `h1`
  per page.
- **Tabs** follow WAI-ARIA: `role="tablist"`, roving `tabIndex`, ←/→/Home/End keys,
  `aria-controls` ↔ `aria-labelledby`.
- **Accordion**: real `<button>`s with `aria-expanded`/`aria-controls`, region panels.
- **Mobile menu**: `aria-expanded`, Escape closes it, body scroll locked, closes on navigation.
- **Projects filter**: `aria-pressed` buttons + `aria-live` result count.
- **Form**: labelled fields, `aria-invalid` + `aria-describedby` error messages,
  `role="alert"` summary, **focus moves to the first invalid field** after submit.
- Visible `:focus-visible` ring in the brand colour; decorative images use `alt=""`.

---

## 8. Forms & data mutation

- The enquiry form uses a **Server Action** (`app/contact/actions.ts`) with React 19's
  `useActionState`.
  - Validation runs on the server, so it can't be bypassed.
  - **Progressive enhancement**: the `<form action>` posts natively before JS loads.
  - `pending` state drives the spinner/disabled button with no extra state.
  - A honeypot field filters simple bots without a CAPTCHA.
- Indian-specific validation (10-digit mobile starting 6–9, optional +91).
- Integration point is one line: send to CRM (Zoho/HubSpot), email (Resend) or Slack.
- `?service=interiors-fitouts` pre-selects the project type, so "Get a quote" on a service
  page carries context.

---

## 9. SEO

- Metadata API with a title template (`%s · Sahyadri Buildcon`), per-page descriptions,
  canonical URLs and Open Graph.
- **Structured data**: `GeneralContractor` (local business, area served), `BreadcrumbList`
  on every inner page, `FAQPage` on `/faq`, `Article` on posts.
- `sitemap.ts` and `robots.ts` generated from the same content arrays.
- Local keyword targeting (Baner, Wakad, Hinjawadi, Chakan MIDC…) in copy, not stuffed.
- Filter state in the URL (`/projects?category=Industrial`) → shareable, crawlable,
  back-button friendly.

---

## 10. Project structure

```
src/
├─ app/                     # routes (App Router)
│  ├─ layout.tsx            # html shell, fonts, header/footer, JSON-LD
│  ├─ template.tsx          # re-mounted per route → page transition
│  ├─ page.tsx              # home
│  ├─ services/[slug]/      # SSG detail pages
│  ├─ projects/[slug]/
│  ├─ insights/[slug]/
│  ├─ about, careers, contact (+ actions.ts), faq
│  ├─ not-found.tsx, sitemap.ts, robots.ts, icon.svg
├─ components/
│  ├─ layout/               # Header, Footer, Logo, Newsletter
│  ├─ motion/               # Reveal, SplitHeading, Counter, Parallax, Magnetic, Providers, PageTransition
│  ├─ sections/             # page sections (Hero, Stats, AudienceTabs, ProjectsScroller…)
│  └─ ui/                   # primitives (Button, Photo, Accordion, Breadcrumbs…)
└─ lib/                     # site config, typed content, image registry, utils
```

Motion primitives are separated from sections so animation behaviour is reusable and
testable on its own, and sections stay readable.

---

## 11. What I'd add next (good interview discussion points)

1. **Headless CMS** (Sanity) with on-demand ISR via webhook.
2. **Testing**: Playwright E2E for nav, filters and the form; axe-core a11y checks in CI;
   Vitest for the server action's validation.
3. **Lighthouse CI** budget on every PR (LCP < 2.0s, CLS < 0.05, JS < 150 KB).
4. **Analytics** with consent: Vercel Analytics / Plausible, conversion event on enquiry.
5. **i18n** — Marathi and Hindi via `[locale]` segment; Devanagari font subset.
6. **Rate limiting** on the server action (Upstash) + Cloudflare Turnstile if spam grows.
7. Project pages with an interactive **map of PMR** sites (MapLibre, lazy-loaded).
