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

    const syncFeaturedServices = () => {
      const servicePanels = Array.from(document.querySelectorAll<HTMLElement>("[data-service-panel]"));
      const viewportAnchor = window.innerHeight * 0.54;
      let activeService: HTMLElement | null = null;
      let nearestDistance = Number.POSITIVE_INFINITY;

      servicePanels.forEach((panel) => {
        const rect = panel.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.9 && rect.bottom > window.innerHeight * 0.1;
        const distance = Math.abs(rect.top + rect.height / 2 - viewportAnchor);

        if (isInView && distance < nearestDistance) {
          activeService = panel;
          nearestDistance = distance;
        }
      });

      servicePanels.forEach((panel) => {
        panel.classList.toggle("is-featured", panel === activeService);
      });
    };

    const updateProgress = () => {
      const scrollable = root.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      root.style.setProperty("--scroll-progress", String(Math.min(Math.max(progress, 0), 1)));
      root.style.setProperty("--scroll-y", String(Math.round(window.scrollY)));

      document.querySelectorAll<HTMLElement>("[data-process-band]").forEach((section) => {
        const rect = section.getBoundingClientRect();
        const track = rect.height - window.innerHeight;
        const raw = track > 0 ? (window.innerHeight - rect.top) / (rect.height + window.innerHeight * 0.15) : 0;
        const sectionProgress = Math.min(Math.max(raw, 0), 1);
        section.style.setProperty("--process-progress", String(sectionProgress));
      });

      syncFeaturedServices();
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

    const serviceObserver = new IntersectionObserver(() => syncFeaturedServices(), {
      rootMargin: "-8% 0px -8% 0px",
      threshold: [0, 0.16, 0.32, 0.5, 0.72],
    });

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
    document.querySelectorAll<HTMLElement>("[data-service-panel]").forEach((element) => serviceObserver.observe(element));
    document.querySelectorAll<HTMLElement>("[data-count-to]").forEach((element) => countObserver.observe(element));

    const pointerPanels = document.querySelectorAll<HTMLElement>(".diagnostic-panel, .service-panel");
    const onPointerMove = (event: PointerEvent) => {
      const element = event.currentTarget as HTMLElement;
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      element.style.setProperty("--pointer-x", x.toFixed(3));
      element.style.setProperty("--pointer-y", y.toFixed(3));
    };
    const onPointerLeave = (event: PointerEvent) => {
      const element = event.currentTarget as HTMLElement;
      element.style.removeProperty("--pointer-x");
      element.style.removeProperty("--pointer-y");
    };

    pointerPanels.forEach((element) => {
      element.addEventListener("pointermove", onPointerMove);
      element.addEventListener("pointerleave", onPointerLeave);
    });

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateProgress);
      revealObserver.disconnect();
      processObserver.disconnect();
      serviceObserver.disconnect();
      countObserver.disconnect();
      pointerPanels.forEach((element) => {
        element.removeEventListener("pointermove", onPointerMove);
        element.removeEventListener("pointerleave", onPointerLeave);
      });
      root.classList.remove("motion-ready", "motion-reduced");
      root.style.removeProperty("--scroll-progress");
      root.style.removeProperty("--scroll-y");
    };
  }, []);

  return (
    <>
      <div className="brand-loader" aria-hidden="true">
        <span>Diligent Designs</span>
        <strong>Calibrating systems</strong>
        <i />
      </div>
      <div className="scroll-progress" aria-hidden="true">
        <span />
      </div>
      <div className="scroll-depth" aria-hidden="true">
        <span>System depth</span>
        <strong />
      </div>
    </>
  );
}
