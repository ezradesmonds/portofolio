# Ezra Desmond Sutanto — Portfolio

Personal portfolio website built with **Astro**, **TypeScript**, and **Tailwind CSS**.

**Framework: Astro** — Selected for static portfolio requirements, excellent performance, minimal JavaScript, and built-in content collections routing. React is used only for interactive islands (mobile menu, scroll reveals).

## Live

[www.ezradesmonds.my.id](https://www.ezradesmonds.my.id)

## Tech Stack

- [Astro 6](https://astro.build) — Static site generation
- [TypeScript](https://www.typescriptlang.org) — Type safety
- [Tailwind CSS 4](https://tailwindcss.com) — Utility-first CSS

## Project Structure

```
src/
  components/
    layout/        BaseLayout, SiteHeader, SiteFooter
    sections/      HeroSection, FeaturedProjects, ExperienceSection, etc.
    ui/            SectionHeading, ProjectCard, TechBadge, etc.
    react/         MobileMenu.astro, ScrollReveal.astro, ActiveNav.astro (vanilla JS)
  data/            Typed content: projects, experience, awards, capabilities
  pages/
    index.astro    Homepage
    work/[slug].astro  Project case studies
    404.astro      Custom 404 page
  styles/
    global.css     Design tokens, base styles, utilities
  types/
    index.ts       Type definitions
public/
  favicon.png      Site favicon
  robots.txt       Crawler directives
  CNAME            Custom domain config
```

## Local Setup

```bash
npm install
npm run dev        # Start development server
```

## Commands

| Command                | Description                     |
|------------------------|---------------------------------|
| `npm run dev`          | Start dev server at localhost   |
| `npm run build`        | Production build to `dist/`     |
| `npm run preview`      | Preview production build        |

## Deployment

Deployed via [Vercel](https://vercel.com) with the `www.ezradesmonds.my.id` custom domain.

```bash
npm run build     # Outputs to dist/
```

## Content Editing

All portfolio content lives in typed data files under `src/data/`:

- `projects.ts` — Project entries with case study details
- `experience.ts` — Experience and leadership timeline
- `awards.ts` — Awards and achievements
- `capabilities.ts` — Technical capabilities grouped by domain
- `site.ts` — Site-wide configuration (name, links, copy)

Edit these files to update the portfolio content. No hard-coded markup changes needed.

## Design System

Design tokens are defined in `src/styles/global.css`:

- **Colors**: Dark navy base, cyan-violet accent palette, warm white text
- **Typography**: Plus Jakarta Sans (headings/body), JetBrains Mono (monospace)
- **Components**: Consistent button variants, card anatomy, section headings
- **Motion**: Intersection Observer-based scroll reveals, prefers-reduced-motion support

## Accessibility

- WCAG 2.2 AA target with 4.5:1+ contrast
- Full keyboard navigation
- Visible focus indicators
- Skip-to-content link
- Semantic HTML landmarks
- ARIA labels on icon-only controls
- `prefers-reduced-motion` support
