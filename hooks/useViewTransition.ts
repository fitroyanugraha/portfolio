"use client";
import { useTransitionRouter } from "next-view-transitions";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const useViewTransition = () => {
  const router = useTransitionRouter();

  const cleanupRouteAnimations = () => {
    const routeRoot = document.querySelector<HTMLElement>("[data-route-root]");
    if (!routeRoot) return;

    // Kill tweens only for elements within the current route.
    gsap.killTweensOf(routeRoot.querySelectorAll("*"));

    // Kill only ScrollTriggers that belong to the current route.
    const triggers = ScrollTrigger.getAll();
    triggers.forEach((t) => {
      const triggerEl = t.vars.trigger as Element | undefined;
      const pinnedEl = t.pin as Element | null;

      const isInRoute =
        (!!triggerEl && routeRoot.contains(triggerEl)) ||
        (!!pinnedEl && routeRoot.contains(pinnedEl));

      if (isInRoute) t.kill();
    });
  };

  function slideInOut() {
    document.documentElement.animate(
      [
        {
          opacity: 1,
          transform: "scale(1)",
        },
        {
          opacity: 0,
          transform: " scale(0.5)",
        },
      ],
      {
        duration: 1200,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-old(root)",
      }
    );

    document.documentElement.animate(
      [
        {
          clipPath: "circle(0% at 50% 50%)",
        },
        {
          clipPath: "circle(75% at 50% 50%)",
        },
      ],
      {
        duration: 1200,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }

  const navigateWithTransition = (href: string, options = {}) => {
    const currentPath = window.location.pathname;
    if (currentPath === href) {
      return;
    }

    // Cleanup animations on the current route BEFORE starting the transition.
    cleanupRouteAnimations();

    router.push(href, {
      scroll: false, // Disable native scroll - handled by ScrollToTop component with Lenis
      onTransitionReady: slideInOut,
      ...options,
    });
  };

  return { navigateWithTransition, router };
};
