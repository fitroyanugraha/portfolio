"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

/**
 * ScrollToTop component - Resets scroll position to top on route changes
 * 
 * This component handles scroll restoration for Lenis smooth scroll.
 * Next.js's native scroll restoration doesn't work with custom scroll implementations,
 * so we manually reset using Lenis's scrollTo API.
 * 
 * Handles:
 * - next/link navigation
 * - Browser back/forward buttons
 * - Client-side transitions with next-view-transitions
 */
export default function ScrollToTop() {
    const pathname = usePathname();
    const lenis = useLenis();
    const prevPathnameRef = useRef<string | null>(null);

    useEffect(() => {
        // Only scroll to top if pathname actually changed
        // This prevents unnecessary scrolls on initial mount or state updates
        if (prevPathnameRef.current !== null && prevPathnameRef.current !== pathname) {
            if (lenis) {
                // Use Lenis's scrollTo for smooth scroll integration
                // immediate: true ensures instant scroll without animation
                // This prevents the jarring effect of scrolling from previous position
                lenis.scrollTo(0, { immediate: true });
            } else {
                // Fallback to native scroll if Lenis isn't available
                // This ensures scroll reset even if Lenis fails to initialize
                window.scrollTo(0, 0);
            }
        }

        // Update the previous pathname for next comparison
        prevPathnameRef.current = pathname;
    }, [pathname, lenis]);

    // This component doesn't render anything
    return null;
}
