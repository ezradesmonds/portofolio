import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

/** Desktop choreography lives separately so the existing mobile flow stays intact. */
export function desktopMotion(root: HTMLElement) {
  gsap.registerPlugin(SplitText);
  const splits: SplitText[] = [];
  const select = gsap.utils.selector(root);
  const hero = root.querySelector<HTMLElement>('.hero')!;
  const sidebar = root.querySelector<HTMLElement>('.sidebar')!;
  const layer = document.createElement('div');
  layer.className = 'desktop-motion-layer';
  layer.setAttribute('aria-hidden', 'true');
  layer.inert = true;
  root.append(layer);
  root.dataset.desktopMotion = 'on';
  const resizeCleanups: Array<() => void> = [];
  // Fit the complete navigation before measuring its animation destinations.
  const fitSidebar = () => {
    gsap.set(sidebar, { scale: Math.min(1, (window.innerHeight - 36) / sidebar.scrollHeight), transformOrigin: 'top left' });
  };
  fitSidebar();
  ScrollTrigger.addEventListener('refreshInit', fitSidebar);
  resizeCleanups.push(() => ScrollTrigger.removeEventListener('refreshInit', fitSidebar));

  // Measure at document coordinates, including when restoring a scrolled page.
  const morph = (sourceSelector: string, targetSelector: string) => {
    const source = root.querySelector<HTMLElement>(sourceSelector);
    const target = root.querySelector<HTMLElement>(targetSelector);
    if (!source || !target) return;
    const clone = source.cloneNode(true) as HTMLElement;
    clone.removeAttribute('id');
    clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
    clone.classList.add('morph-copy');
    layer.append(clone);
    const origin = () => {
      let left = 0, top = 0;
      for (let node: HTMLElement | null = source; node; node = node.offsetParent as HTMLElement | null) {
        left += node.offsetLeft;
        if (!node.classList.contains('hero-stage')) top += node.offsetTop;
      }
      return { left, top, width: source.offsetWidth, height: source.offsetHeight };
    };
    const rect = origin();
    gsap.set(clone, { position: 'fixed', margin: 0, left: rect.left, top: rect.top, width: rect.width, height: rect.height, maxWidth: 'none', transform: 'none', transformOrigin: 'top left' });
    const syncBounds = () => {
      const bounds = origin();
      const style = getComputedStyle(source);
      Object.assign(clone.style, { left: `${bounds.left}px`, top: `${bounds.top}px`, width: `${bounds.width}px`, height: `${bounds.height}px`, fontSize: style.fontSize, padding: style.padding, lineHeight: style.lineHeight, gap: style.gap, whiteSpace: 'nowrap' });
    };
    syncBounds();
    ScrollTrigger.addEventListener('refreshInit', syncBounds);
    resizeCleanups.push(() => ScrollTrigger.removeEventListener('refreshInit', syncBounds));
    gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1 } })
      .fromTo(clone, { autoAlpha: 0 }, { autoAlpha: 1, duration: .04 })
      .to(clone, { autoAlpha: 1, duration: .86 })
      .to(clone, { autoAlpha: 0, duration: .1 });
    gsap.to(clone, {
      x: () => target.getBoundingClientRect().left - origin().left,
      y: () => target.getBoundingClientRect().top - origin().top,
      scaleX: () => target.getBoundingClientRect().width / origin().width,
      scaleY: () => target.getBoundingClientRect().height / origin().height,
      color: () => getComputedStyle(target).color,
      ease: 'power1.inOut',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1, invalidateOnRefresh: true },
    });
    gsap.fromTo(source, { opacity: 1 }, { opacity: 0, scrollTrigger: { trigger: hero, start: 'top top', end: '40px top', scrub: true } });
    gsap.fromTo(target, { opacity: 0 }, { opacity: 1, scrollTrigger: { trigger: hero, start: '90% top', end: 'bottom top', scrub: 1 } });
  };
  gsap.set(sidebar, { x: 0 });
  morph('.hero-name', '.sidebar .desktop-wordmark');
  morph('.hero-actions .accent', '.sidebar > .accent');
  morph('.hero-skillcard-design', '.sidebar-traits > div:first-child');
  morph('.hero-skillcard-build', '.sidebar-traits > div:last-child');
  select('.hero-nav a').forEach((link: HTMLElement) => {
    morph(`.hero-nav a[href="${link.getAttribute('href')}"]`, `.nav-panel a[href="${link.getAttribute('href')}"] .nav-label`);
  });
  gsap.fromTo(sidebar, { autoAlpha: 0 }, { autoAlpha: 1, ease: 'none', scrollTrigger: { trigger: hero, start: '30% top', end: '70% top', scrub: true } });
  gsap.to('.hero-art', { filter: 'blur(90px)', opacity: .3, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: '70% top', scrub: 1 } });
  gsap.to('.hero-main', { y: -60, opacity: 0, ease: 'none', scrollTrigger: { trigger: hero, start: '5% top', end: '20% top', scrub: 1 } });
  gsap.to('.hero-bottom', { yPercent: -100, opacity: 0, ease: 'none', scrollTrigger: { trigger: hero, start: '5% top', end: '10% top', scrub: 1 } });
  gsap.to('.hero-bottomline, .hero-topline', { opacity: 0, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: '10% top', scrub: 1 } });
  gsap.fromTo('.desktop-about-intro', { opacity: 0 }, { opacity: 1, ease: 'none', scrollTrigger: { trigger: hero, start: '70% top', end: '90% top', scrub: 1 } });

  const backdrop = document.createElement('div');
  backdrop.className = 'journey-backdrop';
  backdrop.setAttribute('aria-hidden', 'true');
  backdrop.innerHTML = hero.querySelector('.hero-art svg')!.outerHTML;
  root.append(backdrop);
  gsap.fromTo(backdrop, { opacity: 0 }, { opacity: .3, scrollTrigger: { trigger: hero, start: '25% top', end: '70% top', scrub: 1 } });
  gsap.to(backdrop, { opacity: 0, scrollTrigger: { trigger: '#projects', start: 'top bottom', end: 'top 60%', scrub: true } });

  select('.journey-card').forEach((card: HTMLElement, index: number) => {
    gsap.from(card, { yPercent: 10, opacity: 0, scale: .6, duration: 1.1, delay: .3, ease: 'expo.out', scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' } });
    card.querySelectorAll<HTMLElement>('h3, :scope > p').forEach((text, textIndex) => {
      const split = SplitText.create(text, { type: 'lines', mask: 'lines', aria: 'none', autoSplit: true, onSplit: self => gsap.from(self.lines, { yPercent: 100, duration: .6, stagger: .1, delay: .3 + textIndex * .15, ease: 'expo.out', scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' } }) });
      splits.push(split);
    });
    gsap.from(card.querySelector('.journey-meta'), { opacity: 0, duration: 1.4, delay: .8, ease: 'expo.out', scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' } });
    card.querySelectorAll<HTMLElement>('.year-digit-track').forEach((track, digitIndex) => {
      gsap.fromTo(track, { yPercent: 0 }, { yPercent: -Number(track.dataset.digit) * 10, duration: 1.5, delay: digitIndex * .09, ease: 'power3.inOut', scrollTrigger: { trigger: card, start: 'top 78%', toggleActions: 'play none none reverse' } });
    });
    gsap.from(card.querySelector('.journey-dot'), { scale: 0, duration: .5, delay: .2 + index * .03, ease: 'back.out(2)', scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' } });
  });

  const path = root.querySelector<SVGPathElement>('.journey-path')!;
  const svg = root.querySelector<SVGSVGElement>('.journey-line')!;
  const originalPath = path.getAttribute('d')!;
  const connectJourney = () => {
    const bounds = svg.getBoundingClientRect();
    const points = select('.journey-dot').map((dot: HTMLElement) => {
      const card = dot.parentElement!;
      const x = card.offsetLeft + dot.offsetLeft + dot.offsetWidth / 2;
      const y = card.offsetTop + dot.offsetTop + dot.offsetHeight / 2;
      return { x, y };
    });
    svg.setAttribute('viewBox', `0 0 ${bounds.width} ${bounds.height}`);
    let d = `M ${points[0].x} 0`;
    let previous = { x: points[0].x, y: 0 };
    points.forEach((p: {x: number; y: number}) => {
      const mid = (previous.y + p.y) / 2;
      d += ` C ${previous.x} ${mid}, ${p.x} ${mid}, ${p.x} ${p.y}`;
      previous = p;
    });
    path.setAttribute('d', d);
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length });
  };
  connectJourney();
  ScrollTrigger.addEventListener('refreshInit', connectJourney);
  gsap.fromTo(path, { strokeDashoffset: () => path.getTotalLength() }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '.journey-track', start: 'top 65%', end: 'bottom 65%', scrub: 1, invalidateOnRefresh: true } });

  const track = root.querySelector<HTMLElement>('.project-list')!;
  const gallery = root.querySelector<HTMLElement>('.projects')!;
  const travel = () => Math.max(0, track.scrollWidth - gallery.clientWidth + 64);
  const horizontal = gsap.to(track, { x: () => -travel(), ease: 'none', scrollTrigger: { id: 'work-gallery', trigger: gallery, start: 'top top', end: () => `+=${travel()}`, pin: true, scrub: 1, invalidateOnRefresh: true } });
  select('.project').forEach((card: HTMLElement) => {
    const initiallyVisible = card.offsetLeft < gallery.clientWidth;
    gsap.from(card.querySelector('.project-visual'), { yPercent: 10, scale: .6, opacity: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: initiallyVisible ? { trigger: gallery, start: 'top 80%', once: true } : { trigger: card, containerAnimation: horizontal, start: 'left right', once: true } });
  });
  const theme = gsap.timeline({ paused: true })
    .to(root, { backgroundColor: '#23271f', color: '#eeede6', '--muted': '#cbd0be', duration: .35 }, 0)
    .to(sidebar, {
      '--sidebar-surface': '#353a30',
      '--sidebar-text': '#eeede6',
      '--sidebar-border': '#4c5344',
      '--glass-bg': 'linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.05) 100%)',
      '--glass-border': 'rgba(255, 255, 255, 0.2)',
      '--glass-border-top': 'rgba(255, 255, 255, 0.35)',
      '--glass-border-bottom': 'rgba(255, 255, 255, 0.1)',
      '--glass-shadow': '0 4px 14px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.3), inset 0 -1px 1px rgba(0, 0, 0, 0.2)',
      '--glass-bg-hover': 'linear-gradient(135deg, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.1) 100%)',
      '--glass-icon-hover': '#48a7ff',
      duration: .35
    }, 0);
  ScrollTrigger.create({ trigger: gallery, start: 'top 55%', end: () => `+=${travel() + gallery.offsetHeight}`, onToggle: self => self.isActive ? theme.play() : theme.reverse() });
  gsap.from('.cta-bottom > *', { y: 25, scale: .9, opacity: 0, stagger: .25, duration: .7, ease: 'back.out(1.3)', scrollTrigger: { trigger: '.cta', start: 'top 65%', once: true } });

  return () => {
    splits.forEach(split => split.revert());
    resizeCleanups.forEach(cleanup => cleanup());
    ScrollTrigger.removeEventListener('refreshInit', connectJourney);
    layer.remove();
    backdrop.remove();
    delete root.dataset.desktopMotion;
    path.setAttribute('d', originalPath);
    svg.setAttribute('viewBox', '0 0 900 2200');
  };
}
