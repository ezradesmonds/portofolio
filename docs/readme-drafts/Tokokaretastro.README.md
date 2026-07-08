# TokoKaret Astro

TokoKaret Astro is a fast static storefront for Puka Mobil, focused on automotive rubber parts, clips, carpets, weatherstrips, and consultation-led WhatsApp sales.

## Overview

The site is built as a lightweight catalog and landing page. It explains product categories, helps visitors identify the right part from symptoms, and routes qualified buyers to WhatsApp or marketplace channels.

## Key Features

- Product-focused landing page for automotive rubber and interior accessories.
- Category sections for door rubber, carpets, clips, sealing parts, and related products.
- Symptom-based recommendation widget that maps customer problems to product categories.
- WhatsApp-first conversion flow for consultation and ordering.
- Marketplace and contact links for buyers who prefer external channels.
- SEO metadata, sitemap, and robots configuration.
- Responsive layout optimized for mobile browsing.
- Smooth scrolling and interactive UI enhancements.

## Tech Stack

- Framework: Astro 6
- UI: React 19 islands where interactivity is needed
- Styling: Tailwind CSS 4
- Language: TypeScript
- UX: Lenis smooth scrolling
- SEO: Astro sitemap and robots support

## Project Structure

```text
src/pages/               Astro pages
src/components/          Reusable sections and UI pieces
src/layouts/             Shared page layout
src/styles/              Global styling
public/                  Images and static assets
astro.config.mjs         Astro configuration
```

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

If canonical URLs are enabled, configure the public site URL in the environment or deployment settings.

## Notes

The recommendation feature is implemented as a client-side keyword/category helper. It is intentionally lightweight and should not be described as a full RAG or backend AI system unless a real retrieval backend is added later.

## Suggested Improvements

- Move product data into a typed content collection or CMS if the catalog grows.
- Add structured product schema for richer search results.
- Track WhatsApp CTA events to understand which categories convert best.
- Add real inventory or marketplace sync only when operationally needed.

## Status

Portfolio storefront project. The current architecture is a good fit for a fast marketing/catalog site with low infrastructure overhead.
