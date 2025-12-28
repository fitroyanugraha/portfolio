"use client";
import { useEffect, useState, useMemo, useCallback } from "react";

import { ReactLenis } from "lenis/react";
import { ViewTransitions } from "next-view-transitions";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import Cursor from "@/components/Cursor/Cursor";
import ScrollToTop from "./ScrollToTop";
import { registerGSAPPlugins } from "@/lib/animations";
import { debounce } from "@/lib/performance";

// Ensure GSAP plugins are registered once on the client
if (typeof window !== "undefined") {
  const w = window as unknown as { __gsapPluginsRegistered?: boolean };
  if (!w.__gsapPluginsRegistered) {
    registerGSAPPlugins();
    w.__gsapPluginsRegistered = true;
  }
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth <= 1000);
  }, []);

  const debouncedCheckMobile = useMemo(
    () => debounce(checkMobile, 150),
    [checkMobile]
  );

  useEffect(() => {
    checkMobile();

    window.addEventListener("resize", debouncedCheckMobile);

    return () => window.removeEventListener("resize", debouncedCheckMobile);
  }, [checkMobile, debouncedCheckMobile]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = isMobile ? "auto" : "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobile]);

  const scrollSettings = useMemo(
    () =>
      isMobile
        ? {
          duration: 0.8,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: "vertical" as const,
          gestureDirection: "vertical" as const,
          smooth: false,
          smoothTouch: false,
          touchMultiplier: 1.5,
          infinite: false,
          lerp: 0.09,
          wheelMultiplier: 1,
          orientation: "vertical" as const,
          smoothWheel: false,
          syncTouch: false,
        }
        : {
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: "vertical" as const,
          gestureDirection: "vertical" as const,
          smooth: true,
          smoothTouch: false,
          touchMultiplier: 2,
          infinite: false,
          lerp: 0.1,
          wheelMultiplier: 1,
          orientation: "vertical" as const,
          smoothWheel: true,
          syncTouch: true,
        },
    [isMobile]
  );

  return (
    <ErrorBoundary>
      <ViewTransitions>
        {isMobile ? (
          <>
            <ScrollToTop />
            <Cursor />
            {children}
          </>
        ) : (
          <ReactLenis root options={scrollSettings}>
            <ScrollToTop />
            <Cursor />
            {children}
          </ReactLenis>
        )}
      </ViewTransitions>
    </ErrorBoundary>
  );
}
