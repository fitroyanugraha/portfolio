/**
 * Common type definitions for the portfolio application
 */

import { ReactNode } from "react";

/**
 * Base component props
 */
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

/**
 * Animation props for components
 */
export interface AnimationProps {
  delay?: number;
  duration?: number;
  animateOnScroll?: boolean;
}

/**
 * Navigation link item
 */
export interface NavLinkItem {
  href: string;
  label: string;
  external?: boolean;
}

/**
 * Social media link
 */
export interface SocialLink {
  platform: string;
  url: string;
  icon?: ReactNode;
  ariaLabel: string;
}

/**
 * Project data structure
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  featured?: boolean;
}

/**
 * Contact information
 */
export interface ContactInfo {
  name: {
    first: string;
    last: string;
    full: string;
  };
  email: {
    general: string;
    commissions: string;
  };
  address: {
    city: string;
    country: string;
  };
  social: {
    instagram: string;
    linkedin: string;
    github: string;
    youtube: string;
  };
}

/**
 * Site metadata
 */
export interface SiteInfo {
  title: string;
  description: string;
  tagline: string;
  copyright: string;
  skills: readonly string[];
}

/**
 * GSAP SplitText type (for better type safety)
 */
export interface SplitTextInstance {
  lines: HTMLElement[];
  words?: HTMLElement[];
  chars?: HTMLElement[];
  revert: () => void;
}

/**
 * Video reference type for video management
 */
export type VideoRefsMap = Record<string | number, HTMLVideoElement | null>;

/**
 * ScrollTrigger instance type
 */
export interface ScrollTriggerInstance {
  kill: () => void;
  refresh: () => void;
  enable: () => void;
  disable: () => void;
}

/**
 * Common event handlers
 */
export type ClickHandler = (event: React.MouseEvent<HTMLElement>) => void;
export type LinkClickHandler = (
  event: React.MouseEvent<HTMLAnchorElement>,
  href: string
) => void;
