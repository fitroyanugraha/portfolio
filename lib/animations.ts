import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomEase from "gsap/CustomEase";
import SplitText from "gsap/SplitText";

/**
 * Register all GSAP plugins and custom easings
 * Call this once at app initialization
 */
export const registerGSAPPlugins = () => {
  gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText);

  // Custom easing curves
  CustomEase.create("hop", "0.9, 0, 0.1, 1");
  CustomEase.create(
    "hopAlt",
    "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1"
  );
};

/**
 * Animation duration constants
 */
export const ANIMATION_DURATIONS = {
  fast: 0.3,
  medium: 0.6,
  normal: 0.8,
  slow: 1.2,
  verySlow: 2,
} as const;

/**
 * Animation easing constants
 */
export const ANIMATION_EASINGS = {
  hop: "hop",
  hopAlt: "hopAlt",
  power2: "power2.out",
  power3: "power3.out",
  elastic: "elastic.out(1, 0.5)",
} as const;

/**
 * Common GSAP animation configurations
 */
export const ANIMATION_CONFIGS = {
  fadeIn: {
    opacity: 1,
    duration: ANIMATION_DURATIONS.normal,
    ease: ANIMATION_EASINGS.power3,
  },
  fadeOut: {
    opacity: 0,
    duration: ANIMATION_DURATIONS.normal,
    ease: ANIMATION_EASINGS.power3,
  },
  slideUp: {
    y: 0,
    opacity: 1,
    duration: ANIMATION_DURATIONS.normal,
    ease: ANIMATION_EASINGS.hop,
  },
  slideDown: {
    y: "100%",
    opacity: 0,
    duration: ANIMATION_DURATIONS.normal,
    ease: ANIMATION_EASINGS.hop,
  },
} as const;

/**
 * Accessibility-friendly reduced motion check
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Get animation duration based on user preferences
 * Returns 0 if user prefers reduced motion
 */
export const getAnimationDuration = (duration: number): number => {
  return prefersReducedMotion() ? 0 : duration;
};
