import { useLayoutEffect } from "react";
import type { RefObject } from "react";

// One observer for the page. Pending content stays visible: only a confirmed
// intersection applies an entrance animation, so failed setup never hides it.
export function useEditorialMotion(root: RefObject<HTMLDivElement | null>) {
  useLayoutEffect(() => {
    const page = root.current;
    if (!page || !("IntersectionObserver" in window)) return;
    const hero = page.querySelector<HTMLElement>(".hero");
    const heroStart = page.querySelector<HTMLElement>(".hero-brand");
    const gallery = page.querySelector<HTMLElement>(".gallery-section");
    const galleryCards = new Set(page.querySelectorAll<HTMLElement>(".gallery-grid .photo-frame"));
    let galleryPlayed = false;
    const targets = Array.from(page.querySelectorAll<HTMLElement>([
      ".experience-heading > .eyebrow", ".experience-copy > *", ".motion-title",
      ".section-heading > *", ".about-heading > .eyebrow", ".about-copy > *",
      ".preparation > div:first-child", ".preparation-tip", ".preparation-aside",
      ".faq-section > div:first-child", ".faq-item", ".contact-inner > *",
      ".testimonial-grid > figure", ".testimonials > h2",
      ".photo-frame:not(.hero-image)", ".about-portrait",
    ].join(",")));
    targets.forEach((element) => {
      element.classList.add("motion-target");
      const siblings = Array.from(element.parentElement?.children ?? []);
      const index = Math.max(0, siblings.indexOf(element));
      element.style.setProperty("--motion-order", String(Math.min(index, 4)));
    });
    let heroArmed = true;
    const reveal = (element: HTMLElement) => {
      element.classList.add("motion-seen");
      if (galleryCards.has(element)) galleryPlayed = true;
      else observer.unobserve(element);
    };
    const observer = new IntersectionObserver((entries) => {
      if (document.hidden) return;
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        if (element === hero) {
          // Replay only after the entire hero has passed above the viewport.
          // Small scrolls around the first threshold cannot retrigger it.
          if (!entry.isIntersecting && entry.boundingClientRect.bottom <= 0) {
            heroArmed = true;
            hero.classList.remove("motion-hero-active");
          }
        } else if (element === heroStart) {
          if (entry.isIntersecting && heroArmed) {
            hero?.classList.add("motion-hero-active");
            heroArmed = false;
          }
        } else if (element === gallery) {
          // Include the section's whitespace as a buffer against edge jitter.
          // Only a full section exit can re-arm the mosaic.
          if (!entry.isIntersecting && galleryPlayed) {
            galleryPlayed = false;
            galleryCards.forEach((card) => card.classList.remove("motion-seen", "motion-settled"));
          }
        } else if (galleryCards.has(element)) {
          // Start at the first visible edge, before an already-visible photo
          // could blink. Repeated card-edge crossings do not restart it.
          if (entry.isIntersecting && !element.classList.contains("motion-seen"))
            reveal(element);
        } else if (entry.isIntersecting) reveal(element);
      });
    }, { threshold: [0, 0.15] });
    targets.forEach((element) => observer.observe(element));
    if (hero) {
      const bounds = hero.getBoundingClientRect();
      if (bounds.top >= -80 && bounds.top < innerHeight) {
        hero.classList.add("motion-hero-active");
        heroArmed = false;
      }
      observer.observe(hero);
    }
    if (heroStart) observer.observe(heroStart);
    if (gallery) observer.observe(gallery);
    const resume = () => {
      if (document.hidden) return;
      targets.forEach((element) => {
        const bounds = element.getBoundingClientRect();
        if (!element.classList.contains("motion-seen") && bounds.bottom > 0 && bounds.top < innerHeight) {
          element.classList.add("motion-settled");
          reveal(element);
        }
      });
      // Settle interrupted entrances, leaving the infinite 72s carousel alone.
      page.getAnimations({ subtree: true }).forEach((animation) => {
        if (animation.effect?.getTiming().iterations !== Infinity && animation.playState !== "finished")
          animation.finish();
      });
    };
    const pageShow = (event: PageTransitionEvent) => { if (event.persisted) resume(); };
    document.addEventListener("visibilitychange", resume);
    window.addEventListener("pageshow", pageShow);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", resume);
      window.removeEventListener("pageshow", pageShow);
      hero?.classList.remove("motion-hero-active");
      targets.forEach((element) => {
        element.classList.remove("motion-target", "motion-seen", "motion-settled");
        element.style.removeProperty("--motion-order");
      });
    };
  }, [root]);
}
