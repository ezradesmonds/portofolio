import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);
let dispose: (() => void) | undefined;

function setupPortfolio() {
  dispose?.();
  const root = document.querySelector<HTMLElement>("[data-portfolio-home]");
  if (!root) return;
  document.documentElement.classList.add("studio-enhanced");
  const abort = new AbortController();
  const { signal } = abort;
  const gallery = root.querySelector<HTMLElement>('[data-project-gallery]');
  if (gallery) {
    const galleryObserver = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      galleryObserver.disconnect();
      import('./projectGallery').then(({ setupProjectGallery }) => {
        if (!signal.aborted) setupProjectGallery(gallery, signal);
      }).catch(error => console.warn('Project gallery uses the image fallback:', error));
    }, { rootMargin: '400px' });
    galleryObserver.observe(gallery);
    signal.addEventListener('abort', () => galleryObserver.disconnect(), { once: true });
  }
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const stack = root.querySelector<HTMLElement>('[data-stack-tools]');
  if (stack) {
    const stackObserver = new IntersectionObserver(entries => {
      for (const entry of entries) (entry.target as HTMLElement).dataset.visible = String(entry.isIntersecting);
    });
    stack.querySelectorAll('.stack-group').forEach(group => stackObserver.observe(group));
    signal.addEventListener('abort', () => stackObserver.disconnect(), { once: true });
  }
  const fineDesktop = matchMedia("(min-width: 901px) and (pointer: fine)");
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
  let context: gsap.Context | undefined;
  let lenis: Lenis | undefined;
  let ticker: ((time: number) => void) | undefined;
  let observer: IntersectionObserver | undefined;
  let focusResize: ResizeObserver | undefined;
  let focusVisibility: IntersectionObserver | undefined;

  const progress = root.querySelector<HTMLElement>("[data-reading-progress]");
  const sidebar = root.querySelector<HTMLElement>('[data-section-sidebar]');
  const hero = root.querySelector<HTMLElement>('.portfolio-hero');
  hero?.addEventListener('animationend', event => {
    if (event.animationName === 'entry-page') ScrollTrigger.refresh();
  }, { signal });
  const sidebarSections = [...(sidebar?.querySelectorAll<HTMLAnchorElement>('a') ?? [])]
    .map(link => ({ link, section: root.querySelector<HTMLElement>(link.hash) }))
    .filter((item): item is { link: HTMLAnchorElement; section: HTMLElement } => Boolean(item.section));
  let frame = 0;
  const updateProgress = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const max = Math.max(
        1,
        document.documentElement.scrollHeight - innerHeight,
      );
      if (progress)
        progress.style.transform = `scaleX(${Math.min(1, Math.max(0, scrollY / max))})`;
      if (sidebar && hero && sidebarSections.length) {
        const visible = hero.getBoundingClientRect().bottom <= 0;
        sidebar.classList.toggle('is-visible', visible);
        sidebar.inert = !visible;
        const readingPosition = innerHeight * 0.3;
        const starts = sidebarSections.map(({ section }) => section.getBoundingClientRect().top);
        let active = 0;
        starts.forEach((top, index) => { if (top <= readingPosition) active = index; });
        if (scrollY >= max - 2) active = sidebarSections.length - 1;
        const start = starts[active];
        const end = starts[active + 1] ?? document.documentElement.scrollHeight - scrollY;
        const sectionProgress = Math.min(1, Math.max(0, (readingPosition - start) / Math.max(1, end - start)));
        sidebarSections.forEach(({ link }, index) => {
          if (index === active) {
            link.setAttribute('aria-current', 'location');
            link.style.setProperty('--section-progress', String(sectionProgress));
          } else {
            link.removeAttribute('aria-current');
            link.style.removeProperty('--section-progress');
          }
        });
      }
    });
  };
  addEventListener("scroll", updateProgress, { passive: true, signal });
  addEventListener("resize", updateProgress, { passive: true, signal });
  updateProgress();

  const links = [
    ...root.querySelectorAll<HTMLAnchorElement>(".menu-links a"),
  ];
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        links.forEach((link) =>
          link.hash === `#${entry.target.id}`
            ? link.setAttribute("aria-current", "location")
            : link.removeAttribute("aria-current"),
        );
      }
    },
    { rootMargin: "-20% 0px -65% 0px" },
  );
  root
    .querySelectorAll<HTMLElement>("section[id],#experience")
    .forEach((section) => observer?.observe(section));
  const cue = root.querySelector<HTMLElement>("[data-pointer-cue]");
  const menu = root.querySelector<HTMLDialogElement>('.portfolio-menu');
  const menuToggle = root.querySelector<HTMLButtonElement>('[data-open-menu]');
  let closeTimer: ReturnType<typeof setTimeout> | undefined;
  let pendingAnchor: HTMLAnchorElement | undefined;
  const previousOverflow = document.documentElement.style.overflow;
  const finishClose = () => {
    clearTimeout(closeTimer);
    menu?.close();
    if (cue) root.append(cue);
    menu?.classList.remove('is-closing');
    document.documentElement.style.overflow = previousOverflow;
    lenis?.start();
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (pendingAnchor) {
      const target = root.querySelector<HTMLElement>(pendingAnchor.hash);
      if (target) {
        if (lenis) lenis.scrollTo(target, { offset: -25 });
        else target.scrollIntoView({ behavior: reduced.matches ? 'instant' : 'smooth' });
        history.pushState(null, '', pendingAnchor.hash);
      }
      pendingAnchor = undefined;
    }
  };
  const closeMenu = () => {
    if (!menu?.open || menu.classList.contains('is-closing')) return;
    menu.classList.add('is-closing');
    closeTimer = setTimeout(finishClose, reduced.matches ? 0 : 500);
  };
  menuToggle?.addEventListener('click', () => {
    if (!menu || menu.open) return;
    if (cue) menu.append(cue);
    menu.showModal();
    menuToggle.setAttribute('aria-expanded', 'true');
    document.documentElement.style.overflow = 'hidden';
    lenis?.stop();
  }, { signal });
  menu?.querySelector('[data-close-menu]')?.addEventListener('click', closeMenu, { signal });
  menu?.addEventListener('cancel', event => { event.preventDefault(); closeMenu(); }, { signal });
  menu?.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault(); event.stopPropagation();
    pendingAnchor = link; closeMenu();
  }, { signal }));
  root.addEventListener(
    "click",
    (event) => {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor || !anchor.hash || !lenis) return;
      const target = document.querySelector<HTMLElement>(anchor.hash);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -25 });
      history.pushState(null, "", anchor.hash);
    },
    { signal },
  );

  const copy = root.querySelector<HTMLButtonElement>("[data-copy-email]");
  copy?.addEventListener(
    "click",
    async () => {
      const feedback = root.querySelector<HTMLElement>("[data-copy-feedback]");
      try {
        await navigator.clipboard.writeText(copy.dataset.copyEmail ?? "");
        if (feedback) feedback.textContent = copy.dataset.success ?? "";
      } catch {
        if (feedback) feedback.textContent = copy.dataset.failure ?? "";
      }
    },
    { signal },
  );


  const hideCursor = () => {
    root.classList.remove("has-portfolio-cursor");
    if (cue) { cue.style.opacity = "0"; cue.classList.remove("is-view"); }
  };
  root.addEventListener("pointermove", event => {
    if (!cue || !finePointer.matches || reduced.matches || event.pointerType !== "mouse") return;
    const view = event.target instanceof Element && Boolean(event.target.closest(".latest-card,.archive-row"));
    cue.textContent = view ? "VIEW" : "";
    cue.classList.toggle("is-view", view);
    cue.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
    cue.style.opacity = "1";
    root.classList.add("has-portfolio-cursor");
  }, { passive: true, signal });
  root.addEventListener("pointerleave", hideCursor, { signal });
  addEventListener("blur", hideCursor, { signal });
  finePointer.addEventListener("change", hideCursor, { signal });

  function configure() {
    hideCursor();
    context?.revert();
    focusResize?.disconnect();
    focusVisibility?.disconnect();
    root?.querySelector('[data-true-focus]')?.classList.remove('focus-enhanced');
    root?.querySelectorAll<HTMLElement>('[data-count-to]').forEach(counter => {
      counter.textContent = Number(counter.dataset.countTo).toFixed(Number(counter.dataset.countDecimals ?? 0));
    });
    if (ticker) gsap.ticker.remove(ticker);
    lenis?.destroy();
    ticker = undefined;
    lenis = undefined;
    if (reduced.matches) return;

    if (fineDesktop.matches) {
      lenis = new Lenis({
        duration: 1.08,
        smoothWheel: true,
        wheelMultiplier: 0.9,
      });
      lenis.on("scroll", ScrollTrigger.update);
      ticker = (time) => lenis?.raf(time * 1000);
      gsap.ticker.add(ticker);
    }

    context = gsap.context(() => {
      root?.querySelectorAll<HTMLElement>('[data-count-to]').forEach(counter => {
        const value = { count: 0 };
        gsap.to(value, { count: Number(counter.dataset.countTo), duration: 1.6, ease: 'power2.out',
          scrollTrigger: { trigger: counter, start: 'top 90%', once: true },
          onUpdate: () => { counter.textContent = value.count.toFixed(Number(counter.dataset.countDecimals ?? 0)); } });
      });
      // True Focus treatment: blur surrounding words and move corner brackets.
      const focus = root?.querySelector<HTMLElement>('[data-true-focus]');
      const words = [...(focus?.querySelectorAll<HTMLElement>('.focus-word') ?? [])];
      const bracket = focus?.querySelector<HTMLElement>('.focus-frame');
      if (focus && bracket && words.length) {
        let current = 0;
        const position = () => {
          const parent = focus.getBoundingClientRect();
          const word = words[current].getBoundingClientRect();
          gsap.to(bracket, { x: word.left - parent.left - 7, y: word.top - parent.top - 5,
            width: word.width + 14, height: word.height + 10, duration: 0.5, overwrite: true });
        };
        focus.classList.add('focus-enhanced');
        const advance = () => {
          words.forEach((word, index) => word.classList.toggle('is-focused', index === current));
          position();
          current = (current + 1) % words.length;
        };
        advance();
        const cycle = gsap.timeline({ repeat: -1, paused: true, onRepeat: advance }).to({}, { duration: 2.5 });
        focusVisibility = new IntersectionObserver(([entry]) => {
          cycle.paused(!entry.isIntersecting);
        });
        focusVisibility.observe(focus);
        focusResize = new ResizeObserver(() => {
          const active = words.findIndex(word => word.classList.contains('is-focused'));
          const next = current;
          current = Math.max(0, active); position(); current = next;
        });
        focusResize.observe(focus);
      }
      const film = root?.querySelector<HTMLElement>('.hero-film');
      if (film) {
        gsap.set(film, { height: '100svh', width: () => document.documentElement.clientWidth, borderRadius: 0, background: 'transparent',
          marginLeft: () => -parseFloat(getComputedStyle(film.parentElement!).paddingLeft) });
        const expand = gsap.timeline({ scrollTrigger: {
          trigger: film, start: 'top top', end: () => `+=${innerHeight * 1.55}`,
          pin: true, pinSpacing: true, pinType: 'transform', scrub: .1, invalidateOnRefresh: true,
        } });
        expand.fromTo(film.querySelector('.film-frame'),
          { clipPath: 'inset(21% 29% 21% 29% round 24px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1.2, ease: 'power1.inOut' }, 0);
        expand.fromTo(film.querySelector('.montage-wall'), { scale: 1.35 },
          { scale: 1, duration: 1.2, ease: 'power1.inOut' }, 0);
        expand.fromTo(film.querySelector('.montage-title'), { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: .35 }, .85);
        expand.to(film.querySelector('.film-expand-heading'), { opacity: 0, y: -28, scale: 1.06, duration: .58 }, .48);
        expand.to({}, { duration: .35 });
      }
      gsap.from(".portfolio-manifesto>p", {
        y: 60,
        opacity: 0.25,
        scrollTrigger: {
          trigger: ".portfolio-manifesto",
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        },
      });
      if (!fineDesktop.matches) return;
      gsap.from(".person-portrait img", {
        clipPath: "inset(0 0 20% 0)",
        scale: 1.06,
        ease: "none",
        scrollTrigger: {
          trigger: ".person-portrait",
          start: "top 85%",
          end: "top 20%",
          scrub: 0.6,
        },
      });
    }, root!);
    document.fonts.ready.then(() => {
      if (!signal.aborted) ScrollTrigger.refresh();
    });
  }
  configure();
  reduced.addEventListener("change", configure, { signal });
  fineDesktop.addEventListener("change", configure, { signal });
  dispose = () => {
    finishClose();
    hideCursor();
    abort.abort();
    observer?.disconnect();
    focusResize?.disconnect();
    focusVisibility?.disconnect();
    context?.revert();
    if (ticker) gsap.ticker.remove(ticker);
    lenis?.destroy();
    cancelAnimationFrame(frame);
  };
}

setupPortfolio();
