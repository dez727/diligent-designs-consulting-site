"use client";

import { useEffect } from "react";

export function ScrollAnimations() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      root.classList.add("motion-reduced");
      document.querySelectorAll<HTMLElement>("[data-animate]").forEach((element) => {
        element.classList.add("is-visible");
      });
      return;
    }

    root.classList.add("motion-ready");

    const updateProgress = () => {
      const scrollable = root.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      root.style.setProperty("--scroll-progress", String(Math.min(Math.max(progress, 0), 1)));
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        updateProgress();
        ticking = false;
      });
    };

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          element.classList.add("is-visible");
          revealObserver.unobserve(element);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.16 }
    );

    const processObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          element.classList.toggle("is-active", entry.isIntersecting);
        });
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: 0.2 }
    );

    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          const target = Number(element.dataset.countTo ?? "0");
          const duration = Number(element.dataset.countDuration ?? "1100");
          const start = performance.now();

          const tick = (now: number) => {
            const elapsed = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - elapsed, 3);
            element.textContent = String(Math.round(target * eased));

            if (elapsed < 1) {
              window.requestAnimationFrame(tick);
            } else {
              element.textContent = String(target);
            }
          };

          window.requestAnimationFrame(tick);
          countObserver.unobserve(element);
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll<HTMLElement>("[data-animate]").forEach((element) => revealObserver.observe(element));
    document.querySelectorAll<HTMLElement>("[data-process-step]").forEach((element) => processObserver.observe(element));
    document.querySelectorAll<HTMLElement>("[data-count-to]").forEach((element) => countObserver.observe(element));

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateProgress);
      revealObserver.disconnect();
      processObserver.disconnect();
      countObserver.disconnect();
      root.classList.remove("motion-ready", "motion-reduced");
      root.style.removeProperty("--scroll-progress");
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span />
    </div>
  );
}
