# Aaron reference port

At Ezra's explicit request, the previous light/cobalt studio direction was replaced with a close port of the local Aaron portfolio.

Source: `D:/Documents/Ezra/Programming/CODEX/AARON/AaronPorto-main`.

Directly ported: `src/app/globals.css`, `src/app/desktop.css`, `src/components/motion/desktopMotion.ts`, and the geometric Mark pattern. The original source project is not modified. The port retains its stone/acid palette, Manrope/DM Sans pairing, giant wordmark, dimensional letter composition, hero-to-sidebar morph, connected timeline, and pinned horizontal desktop gallery. `reference-adapter.css` contains the Ezra-specific integration changes.

Not copied: Aaron's name, contact information, biography, work claims, placeholder projects, or generated project artwork. The E-shaped artwork and EZRA wordmark replace the source's A/AARON. Astro remains the route/SEO owner. Only the filtered public project collection is serialized into client islands. Private source records are not exposed.

Native scrolling replaces the source's optional smooth-scroll controller. Below 1000px, reduced motion, and manual pause use normal flow. Project links lead to existing bilingual case studies. Timeline disclosures keep all original experience and award records accessible. Demonstrations use fixed synthetic data and never send or save anything.

The earlier React Bits/21st research informed gallery and control patterns only; no registry component code was copied. React Bits Dock, SplitText and AccordionGallery source and its MIT + Commons Clause license were inspected. No premium components were installed.

## Verification — 28 September 2026

- Astro diagnostics: 79 files, zero errors. Production build: 27 pages, including 12 public case studies in each language.
- Browser: inspected desktop project composition and the 390×844 stacked project gallery. Mobile document width stayed within the viewport; contact columns collapse to one. A hero project link reached the project section.
- Fixed lazy-image refreshes interrupting native anchor navigation; reserved media dimensions remain in place. Added an accessible name to the case-study media dialog.
- Remaining acceptance checks: complete desktop gallery control/reverse-scroll testing, all five viewport sizes in both languages, keyboard/dialog and demo flows, reduced-motion/no-JavaScript behavior, and production performance measurement. Browser control repeatedly timed out during the final responsive pass; these checks are not recorded as passed.
- No commit or deployment performed.
