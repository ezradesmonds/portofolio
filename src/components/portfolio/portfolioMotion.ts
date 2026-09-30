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
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const fineDesktop = matchMedia("(min-width: 901px) and (pointer: fine)");
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
  let context: gsap.Context | undefined;
  let lenis: Lenis | undefined;
  let ticker: ((time: number) => void) | undefined;
  let observer: IntersectionObserver | undefined;

  const progress = root.querySelector<HTMLElement>("[data-reading-progress]");
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
    });
  };
  addEventListener("scroll", updateProgress, { passive: true, signal });
  addEventListener("resize", updateProgress, { passive: true, signal });
  updateProgress();

  const links = [
    ...root.querySelectorAll<HTMLAnchorElement>(".desktop-links a"),
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
  const mobile = root.querySelector<HTMLDetailsElement>(".mobile-navigation");
  mobile?.querySelectorAll("a").forEach((link) =>
    link.addEventListener(
      "click",
      () => {
        if (mobile) mobile.open = false;
      },
      { signal },
    ),
  );
  addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape" && mobile) mobile.open = false;
    },
    { signal },
  );
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

  const cue = root.querySelector<HTMLElement>("[data-pointer-cue]");
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
      gsap.to(".hero-film img", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-film",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
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
    hideCursor();
    abort.abort();
    observer?.disconnect();
    context?.revert();
    if (ticker) gsap.ticker.remove(ticker);
    lenis?.destroy();
    cancelAnimationFrame(frame);
  };
}

setupPortfolio();
