import type { Project } from '../../types';

export function galleryImages(projects: Pick<Project, 'slug' | 'screenshot' | 'proofArtifacts' | 'isPrivate'>[]) {
  const seen = new Set<string>();
  return projects.filter(project => !project.isPrivate).flatMap(project => {
    const cover = project.slug === 'innofashion-show-8' ? '/assets/case-studies/innofashion-menu-landing.webp' : project.screenshot;
    const proofs = (project.proofArtifacts ?? []).filter(item => item.kind !== 'video')
      .filter(item => project.slug !== 'innofashion-show-8' || !/hero|landing/.test(item.src));
    const images = [...new Set([cover, ...proofs.map(item => item.src)])];
    return images.filter((src): src is string => Boolean(src && /\.(webp|png|jpe?g)$/i.test(src) && !seen.has(src)))
      .slice(0, 3).map(src => { seen.add(src); return { slug: project.slug, src }; });
  });
}

// Astro/CSS adaptation of React Bits Drift Wall; license: /licenses/react-bits.txt.
// Native links and CSS loops keep this usable without WebGL or a React island.
export function setupProjectGallery(root: HTMLElement, signal: AbortSignal) {
  const plane = root.querySelector<HTMLElement>('[data-drift-plane]')!;
  const tiles = [...plane.querySelectorAll<HTMLAnchorElement>('[data-gallery-card]')];
  const mobile = matchMedia('(max-width: 700px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const options = { signal };
  let visible = false;
  let browsing = false;
  const update = () => {
    root.dataset.running = String(visible && !document.hidden && !browsing && !reduced.matches);
    root.dataset.view = browsing || reduced.matches ? 'grid' : 'wall';
  };
  const columns = () => {
    const count = mobile.matches ? 3 : 5;
    const groups = Array.from({ length: count }, (_, index) => {
      const column = document.createElement('div');
      column.className = 'drift-column';
      column.style.setProperty('--drift-duration', `${85 + index * 13}s`);
      column.style.setProperty('--drift-delay', `${-index * 17}s`);
      const track = document.createElement('div');
      track.className = 'drift-track';
      const group = document.createElement('div');
      group.className = 'drift-group';
      tiles.filter((_, tileIndex) => tileIndex % count === index).forEach(tile => group.append(tile));
      const copy = group.cloneNode(true) as HTMLElement;
      copy.dataset.driftCopy = '';
      copy.setAttribute('aria-hidden', 'true');
      copy.querySelectorAll('a').forEach(link => { link.tabIndex = -1; });
      track.append(group, copy);
      column.append(track);
      return column;
    });
    plane.replaceChildren(...groups);
  };
  columns();
  root.dataset.enhanced = 'true';
  update();
  plane.addEventListener('focusin', event => {
    // Keyboard users get every original tile in a stable, unclipped grid.
    if ((event.target as HTMLElement).matches(':focus-visible')) { browsing = true; update(); }
  }, options);
  plane.addEventListener('focusout', event => {
    if (!plane.contains(event.relatedTarget as Node | null)) { browsing = false; update(); }
  }, options);
  mobile.addEventListener('change', columns, options);
  reduced.addEventListener('change', update, options);
  document.addEventListener('visibilitychange', update, options);
  const observer = new IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting);
    update();
  });
  observer.observe(root);
  signal.addEventListener('abort', () => observer.disconnect(), { once: true });
}
