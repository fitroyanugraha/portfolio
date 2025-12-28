"use client";
import "./AnimateItem.css";
import React, { useRef } from "react";
import gsap from "gsap";
import type { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export interface AnimatedItemProps {
  children: React.ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
  duration?: number;
  scrollStart?: string;
  ease?: string;
  distance?: number;
  className?: string;
}

export default function AnimatedItem({
  children,
  animateOnScroll = true,
  delay = 0,
  duration = 0.8,
  scrollStart = "top 90%",
  ease = "power2.out",
  distance = 60,
  className = "",
}: AnimatedItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const element = containerRef.current.firstElementChild as HTMLElement;
      if (!element) return;

      // Make element visible and set initial animation state
      element.style.visibility = 'visible';
      gsap.set(element, { y: distance, opacity: 0 });

      const animConfig = {
        y: 0,
        opacity: 1,
        duration,
        ease,
        delay,
      };

      if (animateOnScroll) {
        const tween = gsap.to(element, {
          ...animConfig,
          scrollTrigger: {
            trigger: element,
            start: scrollStart,
            once: true,
          },
        });
        scrollTriggerRef.current = tween.scrollTrigger as ScrollTrigger;
      } else {
        gsap.to(element, animConfig);
      }

      return () => {
        scrollTriggerRef.current?.kill();
        scrollTriggerRef.current = null;
      };
    },
    { scope: containerRef, dependencies: [animateOnScroll, scrollStart, distance, delay, duration, ease] }
  );

  return (
    <div ref={containerRef} className={`animate-item ${className}`.trim()}>
      {children}
    </div>
  );
}
