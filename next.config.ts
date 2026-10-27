import type { NextConfig } from "next";

/**
 * `output: "export"` produces a fully static site in /out, so the portfolio can
 * be hosted on any provider (Node host, Nginx, cPanel, Netlify, Vercel,
 * Cloudflare Pages, GitHub Pages) without a Node runtime.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;