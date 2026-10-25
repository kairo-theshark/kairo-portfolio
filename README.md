<h1 align="center">Portfolio</h1>

<p align="center">
  Personal portfolio template built with Next.js, TypeScript and Tailwind CSS.
  Content, contacts and photos live in <code>lib/content.ts</code> and <code>public/photos/</code>.
</p>

<p align="center">
  <a href="https://nextjs.org/"><img alt="Next.js 16.4" src="https://img.shields.io/badge/Next.js-16.4-000000?logo=nextdotjs&logoColor=white"></a>
  <a href="https://www.typescriptlang.org/"><img alt="TypeScript 5.9" src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white"></a>
  <a href="https://tailwindcss.com/"><img alt="Tailwind CSS 3.4" src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white"></a>
  <a href="https://www.docker.com/"><img alt="Docker multi-stage" src="https://img.shields.io/badge/Docker-multi--stage-2496ED?logo=docker&logoColor=white"></a>
</p>

<p align="center">
  <a href="#features">Features</a> ·
  <a href="#tech-stack">Tech stack</a> ·
  <a href="#project-structure">Project structure</a> ·
  <a href="#getting-started">Getting started</a> ·
  <a href="#environment-variables">Environment variables</a> ·
  <a href="#telemetry-integration">Telemetry</a> ·
  <a href="#docker">Docker</a> ·
  <a href="#validation">Validation</a>
</p>

A minimal, dark, typography-first portfolio. The first screen holds one short statement and five text links; below it are the latest GitHub commits and two read-only telemetry panels. The interface is intentionally quiet: no hero panels, cards, badges, or decorative charts.

## Features

- Five entry points on the home page: development, design, GitHub, personality, and social links.
- Live GitHub commit feed with a 15-minute server-side cache and an honest offline state.
- Two read-only telemetry panels for system and network metrics: a primary host and a secondary VPS with VPN traffic.
- Honest telemetry states: `online`, `demo`, and `offline` are always visible and never mixed.
- Graceful degradation: when the telemetry backend is unavailable, the site keeps working and the dashboard reports `offline`.
- Generated Open Graph image (1200×630 PNG), `robots.txt`, and a sitemap for the site pages.
- Liveness endpoint for container health checks.
- Server Components by default; client boundaries only where interaction is required.
- Dark theme only, visible focus states, reduced-motion support, and a skip link.
- Responsive down to 375 px wide.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16.4 (App Router, `output: "standalone"`, Turbopack) |
| UI | React 19.3, TypeScript 5.9 |
| Styling | Tailwind CSS 3.4 with semantic color tokens |
| Icons | `lucide-react` |
| Utilities | `clsx`, `tailwind-merge` |
| Fonts | IBM Plex Sans and JetBrains Mono, loaded from Google Fonts |
| Runtime | Node.js 26 (`26.12.1-alpine3.24`), Active LTS from 2026-10-28 |

## Project structure

```text
app/
  layout.tsx                Fonts, metadata, shared header and footer
  page.tsx                  Home page: entry points, commits, telemetry
  globals.css               Design tokens, backdrop, base styles
  loading.tsx               Loading state
  error.tsx                 Client error boundary
  not-found.tsx             404 page
  opengraph-image.png       Open Graph image
  robots.ts                 robots.txt
  sitemap.ts                sitemap.xml
  development/page.tsx      Projects
  design/page.tsx           Engineering projects and skills
  personality/page.tsx      About and current focus
  social/page.tsx           Contact channels
  api/dashboard/route.ts    Sanitized telemetry JSON
  api/health/route.ts       Liveness probe
components/
  live-dashboard.tsx        Client polling of /api/dashboard
  server-dashboard.tsx      Primary host panel
  vps-dashboard.tsx         VPS and VPN panel
  dashboard-skeleton.tsx    Suspense fallback for both panels
  module-buttons.tsx        Home page entry points
  page-hero.tsx             Compact inner-page heading
  photo-figure.tsx          Pre-optimized WebP photo with mono caption
  photo-backdrop.tsx        Edge-bleeding, masked hero backdrop
  photo-band.tsx            Full-width semi-transparent photo band
  project-card.tsx          Project case card
  project-grid.tsx          Case grid, centred and page-width bounded
  recent-commits.tsx        GitHub commit rows
  site-header.tsx           Contact-only header
  site-footer.tsx           Footer navigation
  copy-email.tsx            Copy-to-clipboard email
lib/
  beszel.ts                 Server-only telemetry client, cache, offline fallback
  github.ts                 Server-only GitHub commit feed, cache, offline fallback
  content.ts                Editable content and navigation
  types.ts                  Shared types
  utils.ts                  Tailwind class helper
public/
  photos/                   Pre-optimized WebP gallery images
```

## Requirements

- Node.js 24 is what the container image builds on (pinned `24.22.1-alpine3.24`); Next.js 16 itself requires Node.js 20.9 or newer. The project does not pin an `engines` range.
- npm with the committed `package-lock.json`.
- No database or external service is required to start the site. Telemetry is optional.

## Getting started

```bash
npm ci
npm run dev
```

The site is served at <http://localhost:3000>.

Without telemetry credentials, the home-page dashboard shows clearly labeled demo values in development. Production builds report `offline` instead.

## Environment variables

Nothing is required to boot the application. Telemetry needs a reachable Beszel instance and a dedicated read-only account.

```bash
cp .env.example .env
```

| Variable | Required for live telemetry | Default | Purpose |
| --- | --- | --- | --- |
| `BESZEL_URL` | yes | — | Base URL of the Beszel hub |
| `BESZEL_EMAIL` | yes | — | Read-only account email |
| `BESZEL_PASSWORD` | yes | — | Read-only account password |
| `BESZEL_SYSTEM` | yes | — | Beszel system used by the primary panel |
| `BESZEL_DISPLAY_NAME` | no | Built-in fallback label | Label shown on the primary panel |
| `BESZEL_REVALIDATE` | no | `30` | Telemetry cache TTL in seconds, clamped to 10–300 |
| `BESZEL_VPS_SYSTEM` | no | `VPS` | Beszel system used by the VPS panel |
| `BESZEL_VPS_DISPLAY_NAME` | no | `vps · vpn` | Label shown on the VPS panel |

`.env.example` contains placeholders only. `.env` is ignored by Git and must never be committed.

## npm scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Start a production server from an existing build |
| `npm run lint` | Run ESLint (`eslint .`, flat config) |
| `npm run typecheck` | Run `tsc --noEmit` |

Because the project uses `output: "standalone"`, Next.js warns that `next start` is not supported for this mode. The supported production path is the standalone server inside the Docker image; use `npm run dev` for local work.

## Telemetry integration

`lib/beszel.ts` is server-only. It authenticates against Beszel, maps its records to a small dashboard shape, and never exposes credentials or tokens to the browser.

- Requests time out after 5 seconds.
- The access token is cached for 30 minutes, with a single retry after a `401`.
- Telemetry responses are cached for about 30 seconds (`BESZEL_REVALIDATE`).
- The primary panel shows CPU, RAM, disk, temperature, uptime, and network throughput.
- The VPS panel shows CPU, RAM, and disk, plus download/upload traffic in the fourth slot. Agents without a temperature sensor report no reading, so traffic is shown instead.
- The client refreshes every 30 seconds and pauses while the tab is hidden.

### States

| State | When it appears | What is rendered |
| --- | --- | --- |
| `online` | Beszel returned a system marked as up | Live values |
| `demo` | Development only, no credentials configured | Sample values, explicitly labeled |
| `offline` | Credentials missing in production, or Beszel unreachable | Dashes, or the last successful snapshot marked `offline` |

The VPS panel never falls back to demo values.

### API routes

- `GET /api/dashboard` returns the primary snapshot at the top level and the secondary snapshot under `vps`. It is rate-limited to 60 requests per minute per IP, responds with `Cache-Control: no-store`, and contains no secrets. The limiter is in-memory and intended for a single instance.
- `GET /api/health` returns `status`, `uptime`, and `timestamp`. It does not depend on Beszel and is used as the container liveness probe.

## Content

`lib/content.ts` is the single source of truth for site copy, links, and projects.

- The homepage commit feed is not edited by hand: `lib/github.ts` reads the public default branches of `githubOwner` every 15 minutes and shows the three newest commits.
- `project.href: "#"` renders the project title as plain text instead of a link.
- Social links use `category` plus `showInHeader` and `showInFooter` flags; the footer and header filter the same array.
- Adding a route means creating `app/<route>/page.tsx` and updating both `navLinks` and `modules`.

## Design system

- Dark mode is the only supported theme.
- Colors are RGB triplets in `app/globals.css`, mapped to Tailwind in `tailwind.config.ts`. Use semantic classes such as `bg-background`, `bg-surface`, `border-line`, `text-foreground`, `text-muted`, `text-accent`, `text-positive`, and `text-warning` instead of raw hex values.
- IBM Plex Sans is the primary typeface; JetBrains Mono is reserved for small technical labels.
- `container-page` is the standard content width; the dashboard uses `max-w-[1440px]`.
- Motion respects `prefers-reduced-motion`, focus rings stay visible, and interactive elements use real links and buttons.

## Docker

The image is built in three stages (`deps` → `builder` → `runner`). The runtime stage is a minimal Alpine image containing the Node.js binary and the standalone build only — no npm, npx, or corepack — plus the shared libraries the musl Node binary links against (`libstdc++`, `libatomic`), and runs as a non-root user on port 3000. A `HEALTHCHECK` probes `/api/health` every 30 seconds.

```bash
docker build -t portfolio .
docker run --rm -p 3000:3000 --env-file .env portfolio
```

The maintainer's Compose-based deployment is not included in this repository: it expects pre-existing external Docker networks for the reverse proxy and the telemetry stack, and reads variables from `.env`. It is therefore not self-contained and will not run on a clean machine without those networks. For local work, use `npm run dev` or the `docker run` command above.

## Validation

```bash
npm run lint
npm run typecheck
npm run build
```

There is no automated test runner or CI pipeline in this repository. For manual checks, start the app and review the main routes, `/api/health`, `/api/dashboard`, `/sitemap.xml`, `/robots.txt`, and `/opengraph-image`.

## Security notes

- Keep Beszel credentials server-side. Never use `NEXT_PUBLIC_*` variables for them, and never import `lib/beszel.ts` from a Client Component.
- Do not commit `.env` files or real credentials. `.env.example` is the only environment file that belongs in the repository.
- Treat telemetry responses as untrusted input and validate values before rendering them.
- Keep `/api/dashboard` limited to the fields the UI needs.
- Use a dedicated read-only Beszel account rather than an administrator account.

## License

No license is currently provided.
