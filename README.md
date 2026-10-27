# Raghav Ghimire — Developer Portfolio

A production-ready, static portfolio for a Flutter & Full-Stack developer. Built with
Next.js 15 (App Router, static export), TypeScript, Tailwind CSS v4 and PostgreSQL-flavored
real-world projects.

The site is a fully static export (`next build` → `out/`), so it can be deployed to any host
that serves static files — Vercel, Netlify, Cloudflare Pages, a VPS behind Nginx, cPanel, GitHub
Pages, or your own server. **Nothing in this repository invents a client, a URL, a statistic or a
testimonial.** Every link, credential, profile and result is optional and controlled by you.

---

## What it contains

- A sticky, glass-navbar with a theme toggle and an animated mobile menu (Escape-to-close,
  scroll-lock while open).
- A hero section with a developer-themed architectural visual (no stock photo).
- An **About**, **Skills**, **Featured Projects**, **Experience**, **Services**,
  **How I Work**, **Architecture** ("From Interface to Infrastructure"), **GitHub CTA** and
  **Contact** sections.
- Per-project **case-study pages** (`/projects/<slug>/`) with a nine-part structure,
  a sticky table of contents, prev/next navigation and architecture layer diagrams.
- Dark / light mode, persisted to `localStorage` and applied before first paint.
- Accessibility: skip link, focus rings, `prefers-reduced-motion`, semantic headings,
  ARIA live regions and WCAG-validated color contrast.
- SEO: canonical tags, sitemap, `robots.txt`, Open Graph, Twitter/X cards, structured
  `application/ld+json` data and a generated favicon + social preview image.

---

## Quick start

```bash
# from the repository root
npm install            # install dependencies
npm run dev            # start the dev server at http://localhost:3000
```

## Build for production

```bash
npm run build          # type-check, lint and export to ./out
```

The exported site lives in `out/` and consists entirely of static HTML, CSS and assets with no
client-side data fetching — no Node runtime is required at serving time.

## Environment variables

All personal details are read from environment variables (see [Configuration](#configuration)).
Copy the example and fill it in:

```bash
cp .env.example .env.local
```

| Variable                      | Purpose                                    | Required |
| ----------------------------- | ------------------------------------------ | -------- |
| `NEXT_PUBLIC_SITE_URL`        | Canonical origin (`https://example.com`)   | yes*     |
| `NEXT_PUBLIC_EMAIL`           | Contact email shown in the footer/contact  | no       |
| `NEXT_PUBLIC_PHONE`           | Phone number shown in the footer/contact   | no       |
| `NEXT_PUBLIC_GITHUB_URL`      | GitHub profile link                        | no       |
| `NEXT_PUBLIC_LINKEDIN_URL`    | LinkedIn profile link                      | no       |
| `NEXT_PUBLIC_X_URL`           | Optional X / Twitter profile link          | no       |
| `NEXT_PUBLIC_RESUME_URL`      | Resume download link                       | no       |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT`| A hosted form endpoint for the contact form | no    |

> \*If `NEXT_PUBLIC_SITE_URL` is unset the build still succeeds — metadata uses a placeholder so
> you can preview locally. **You must set it before deploying**, otherwise Open Graph tags and the
> sitemap will point at `https://example.com`.

Any variable you leave empty simply removes the related link or button from the UI, rather than
rendering an invented URL.

---

## Configuration

Personal details live in **`src/config/site.config.ts`** and are read from `.env.local`. Edit the
content there (name, headline, bio, background highlights, the "How I Work" steps, the skills list,
the experience and education entries, the services list and the architecture narrative) — never inside
components.

Project data lives in **`src/content/projects.ts`**. Each entry has a `slug`, a `status`
(`Live`, `Completed`, `In Development`, `Concept` or `Private`), a `links: []` array, and
a nine-part case study (`overview`, `problem`, `solution`, `features`, `technologies`,
`architecture`, `challenges`, `contribution`, `results`).

## Adding a project later

1. Add an entry to `src/content/projects.ts` (reuse the existing shape).
2. Add a `ProjectGlyph` entry in `src/components/ui/icons.tsx` if your project needs a new icon.
3. Run `npm run build` — the new case-study page is generated automatically at
   `/projects/<slug>/`, and it is picked up by the sitemap and JSON-LD.

## Regenerating the social / icon images

```bash
npm run og     # renders public/og-image.png (1200x630) and public/apple-icon.png (180x180)
```

It uses headless Chrome and reads the name/title/stack from environment variables
(`OG_NAME`, `OG_TITLE`, `OG_CHIPS`) so it can be re-run after you change your details.

---

## Deployment

This is a static site. The simplest path is:

### Option A — Git-based host (recommended)

Push the repository to GitHub, then connect it to **Vercel** or **Netlify**. Both auto-detect
Next.js and the `out/` directory.

### Option B — Serve `out/` yourself

After `npm run build`:

```bash
# Quick preview with a static server
npm install -g serve        # or python, caddy, nginx, etc.
serve -s out -l 3000
```

To serve with **Nginx**, point the document root at `out/` and add the essentials:

```nginx
server {
    listen 80;
    server_name your-domain.com;          # <-- set this
    root /var/www/portfolio/out;
    index index.html;

    # SPA-style routing: Next's static export needs an index fallback per folder
    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    # Always serve a real file or fall back to the 404 page.
    location /_next/ {
        # static assets are in out/_next/
    }
}
```

### Connecting your custom domain

1. Point your domain's **A record** at your server's IP (or a CNAME/ALIAS at your host, e.g.
   `CNAME your-domain.com → your-site.netlify.app` / your GitHub Pages account).
2. Set `NEXT_PUBLIC_SITE_URL=https://your-domain.com` in your build environment (and re-run
   `npm run build` so the sitemap, canonical and OG URLs are correct).
3. Reload — `sitemap.xml` and `robots.txt` will now reference your real domain.

### HTTPS

- If you use **Vercel / Netlify / Cloudflare Pages**, HTTPS is automatic (they issue and renew
  Let's Encrypt certificates for you).
- If you serve it yourself, run the build once to generate the static files, then terminate TLS
  with a reverse proxy such as **Caddy** (automatic certs) or **Nginx** with Certbot:

```bash
sudo certbot --nginx -d your-domain.com
```

### Verifying a deploy

```bash
npm run audit          # checks links, headings and a11y in ./out
npm run check-contrast # validates color contrast for both themes
npm run lint && npm run typecheck && npm run build
```

(Optional) `npm run verify-runtime` drives headless Chrome against `out/` to check for console
errors, horizontal overflow, theme persistence and the mobile menu. Requires Chrome/Edge.

---

## How to update the portfolio later

- **Content**: edit `src/config/site.config.ts` and the files in `src/content/`, then re-run
  `npm run build` and redeploy the new `out/`.
- **Projects**: add an entry to `src/content/projects.ts` (see above).
- **Theme colors**: edit the `:root` / `.dark` tokens in `src/app/globals.css` and re-run
  `npm run check-contrast` to keep contrast compliant.
- **Social image**: after changing the name/title, run `npm run og` to regenerate
  `public/og-image.png`.

---

## Project structure

```
.
├── src/
│   ├── app/                      # App Router: pages + route handlers + metadata
│   │   ├── layout.tsx            # root layout, fonts, SEO metadata, ThemeScript
│   │   ├── page.tsx              # homepage composition
│   │   ├── globals.css           # tokens, theme, motion, utilities
│   │   ├── not-found.tsx
│   │   ├── icon.svg              # favicon (auto-served by Next)
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── projects/[slug]/      # dynamic, statically generated case-study pages
│   ├── components/
│   │   ├── layout/navbar.tsx     # sticky nav, theme toggle, mobile menu
│   │   ├── layout/footer.tsx
│   │   ├── sections/*            # hero, about, skills, projects…
│   │   ├── ui/{badge,button,flow,icons,layout,reveal}.tsx
│   │   ├── theme/theme-script.tsx
│   │   ├── theme/theme-provider.tsx
│   │   ├── theme/theme-store.ts
│   │   └── seo/json-ld.tsx       # Person / WebSite / ItemList structured data
│   ├── config/site.config.ts     # single source of truth for all personal data
│   └── content/                  # content collections (skills, projects, experience…)
├── public/
│   ├── og-image.png              # 1200x630 social preview
│   └── apple-icon.png            # 180x180 touch icon
├── scripts/                      # build/verify tooling (see package.json scripts)
├── out/                          # generated static site (do not commit)
├── package.json
├── next.config.ts                # output: "export" — pure static site
├── tsconfig.json
├── eslint.config.mjs
└── PORTFOLIO_MASTER_PROMPT.md    # the source of truth for this build
```

---

## Notes on authenticity

By design, none of the project cards claim live links or statistics: real repository and demo URLs
are added per-project in `src/content/projects.ts` under `links`, and only then do the buttons
appear. Statuses distinguish **Implemented / Integrated / In Development** so nothing reads as
shipping before it is. No credentials, hostnames, tokens or server secrets are present in this
repository.
