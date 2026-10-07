import localFont from "next/font/local";

/**
 * Fonts are self-hosted from @fontsource packages via next/font/local:
 *  - no request to Google at runtime (privacy, no third-party DNS hop)
 *  - no network dependency at build time (CI-safe)
 *  - next/font still preloads them and generates size-adjusted fallbacks,
 *    so text doesn't jump when the web font swaps in (CLS ≈ 0).
 */
export const fraunces = localFont({
  src: [
    { path: "../../node_modules/@fontsource-variable/fraunces/files/fraunces-latin-full-normal.woff2", style: "normal" },
    { path: "../../node_modules/@fontsource-variable/fraunces/files/fraunces-latin-full-italic.woff2", style: "italic" },
  ],
  variable: "--font-fraunces",
  weight: "100 900",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

export const manrope = localFont({
  src: "../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});
