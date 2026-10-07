import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Remote stock photography is served through next/image so it gets
    // AVIF/WebP conversion, responsive srcset and lazy loading for free.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // Tree-shakes barrel imports from motion so only used features ship.
    optimizePackageImports: ["motion"],
  },
};

export default nextConfig;
