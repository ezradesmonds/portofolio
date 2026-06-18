# CHANGELOG

## v2.0.0 — Astro Migration (2026-06-17)

### Framework Migration
- Migrated from single HTML/CSS/JS file to Astro + TypeScript + Tailwind CSS
- React used only for interactive islands (MobileMenu, ScrollReveal, ActiveNav)
- Content extracted to typed data files for maintainability

### Architecture
- Component-based architecture with layout, section, and UI components
- Typed data layer for projects, experience, awards, capabilities, and site config
- Dynamic project case study pages at `/work/[slug]`
- Static generation for all pages
- Auto-generated sitemap via @astrojs/sitemap

### UI/UX Improvements
- Redesigned visual identity preserving dark navy + cyan-violet palette
- Added section numbering (01–06)
- New proof strip with verified metrics
- Grouped technical capabilities by domain
- Improved project card hierarchy (featured vs additional)
- Added dedicated project detail pages replacing modal-only content
- Proper button hierarchy (primary, secondary, ghost)
- Consistent spacing, typography, and card anatomy
- Mesh gradient background with subtle noise texture
- Glass card surfaces with animated border glow
- Mac-window code block in hero

### Content Updated
- New headline: "Software Engineer & AI Product Builder"
- New subheadline with Indonesian market focus
- Updated About section with current professional direction
- 7 featured projects with detailed case studies
- 5 additional projects in secondary grid
- Experience and leadership timeline
- Awards section with 4 verified achievements
- Updated education (4th semester, GPA 3.75)
- Updated LinkedIn URL
- Removed outdated copy (Brawlhalla, "certified Best Keyboardist")
- Accurate project statuses (In Development, Prototype, Live, etc.)

### Motion
- Scroll-based reveal animations via Intersection Observer
- Staggered entrance support
- prefers-reduced-motion support
- Active navigation section tracking
- Removed GSAP dependency (no longer needed)

### Accessibility
- Skip-to-content link
- Semantic HTML landmarks (header, main, footer, nav, article)
- ARIA labels on icon-only controls
- Visible focus indicators
- Keyboard-navigable mobile menu with Escape support
- Proper heading hierarchy
- Accessible modal replacement with dedicated pages

### SEO
- Page-specific titles and meta descriptions
- Open Graph and Twitter Card metadata
- Canonical URLs
- Auto-generated sitemap.xml
- robots.txt
- Person and WebSite structured data

### Performance
- Static generation (zero server code)
- Zero external JavaScript (<1KB inline scripts)
- Optimized font loading with preconnect
- CSS custom properties for runtime performance
- No third-party CDN scripts (Tailwind bundled at build time)
- React removed — all interactivity uses vanilla JS with Intersection Observer

### Files Changed
- Removed: index.html, style.css, script.js
- Created: 30+ files under src/
- Updated: README.md, package.json, astro.config.mjs

### Removed Dependencies
- GSAP (replaced with Intersection Observer)
- Tailwind CSS CDN (bundled at build time)
- Devicon CDN (replaced with inline SVGs/badges)
- React + React DOM (replaced with vanilla JS)

### Added Dependencies
- astro, @astrojs/sitemap
- @tailwindcss/vite, tailwindcss
- @astrojs/check, typescript (dev only)
- No runtime JS dependencies in production

### Remaining TODOs
- Add project screenshots and mockups
- Add downloadable resume when available
- Add more structured data (Project/CreativeWork schema)
- Implement image optimization with Astro's Image component
- Add case study depth for projects currently marked TODO
- Add more verified metrics as they become available
