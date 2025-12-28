"use client";
import "./AnimatedButton.css";
import React, { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useViewTransition } from "@/hooks/useViewTransition";
import { useFontLoader } from "@/hooks/useFontLoader";
import { IoMdArrowForward } from "react-icons/io";

interface AnimatedButtonProps {
  label: string;
  route?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  iconDirection?: "right" | "left";
  showIcon?: boolean;
  animate?: boolean;
  animateOnScroll?: boolean;
  delay?: number;
  noTextShadow?: boolean;
}

const AnimatedButton = React.memo<AnimatedButtonProps>(({
  label,
  route,
  onClick,
  iconDirection = "right",
  showIcon = true,
  animate = true,
  animateOnScroll = true,
  delay = 0,
  noTextShadow = true,
}) => {
  const { navigateWithTransition } = useViewTransition();
  const { waitForFonts } = useFontLoader();
  const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);
  const innerGlowRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const splitRef = useRef<SplitText | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useGSAP(
    () => {
      if (!buttonRef.current || !textRef.current) return;

      if (!animate) {
        gsap.set(buttonRef.current, { scale: 1, opacity: 1 });
        gsap.set(glowRef.current, { scale: 1, opacity: 0.6 });
        gsap.set(iconRef.current, { opacity: 1, x: 0 });
        return;
      }

      const initAnim = async () => {
        await waitForFonts();

        const split = new SplitText(textRef.current!, {
          type: "lines",
          linesClass: "line++",
        });
        splitRef.current = split;

        gsap.set(buttonRef.current, { scale: 0.8, opacity: 0 });
        gsap.set(glowRef.current, { scale: 0.5, opacity: 0 });
        gsap.set(iconRef.current, { opacity: 0, x: 15 });
        gsap.set(split.lines, { y: "120%", opacity: 0 });

        const tl = gsap.timeline({ delay });

        tl.to(buttonRef.current, { scale: 1, opacity: 1, duration: 1, ease: "power3.out" })
          .to(glowRef.current, { scale: 1, opacity: 0.6, duration: 0.8, ease: "power2.out" }, "-=0.6")
          .to(iconRef.current, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }, "-=0.5")
          .to(split.lines, { y: "0%", opacity: 1, duration: 0.8, stagger: 0.1, ease: "power4.out" }, "-=0.2");

        if (animateOnScroll) {
          scrollTriggerRef.current = ScrollTrigger.create({
            trigger: buttonRef.current,
            start: "top 90%",
            once: true,
            animation: tl,
          });
        } else {
          tl.play();
        }
      };

      initAnim();

      return () => {
        splitRef.current?.revert();
        scrollTriggerRef.current?.kill();
        splitRef.current = null;
        scrollTriggerRef.current = null;
      };
    },
    { scope: buttonRef, dependencies: [animate, animateOnScroll, delay] }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!buttonRef.current || !innerGlowRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    innerGlowRef.current.style.setProperty('--mouse-x', `${x}%`);
    innerGlowRef.current.style.setProperty('--mouse-y', `${y}%`);
  };

  const contentWrapperClassName = `button-content-wrapper ${iconDirection === "left" ? "icon-left" : ""} ${showIcon ? "" : "no-icon"}`;

  const buttonContent = (
    <>
      <span className="glass-glow" ref={glowRef} aria-hidden="true" />
      <span className="glass-border" aria-hidden="true" />
      <span className="inner-glow" ref={innerGlowRef} aria-hidden="true" />
      <div className={contentWrapperClassName}>
        <span className="button-text" ref={textRef}>{label}</span>
        {showIcon ? (
          <div className="icon" ref={iconRef}>
            <IoMdArrowForward />
          </div>
        ) : null}
      </div>
    </>
  );

  const className = `glass-btn ${!animate ? 'no-anim' : ''} ${isHovered ? 'hovered' : ''} ${noTextShadow ? 'no-text-shadow' : ''}`;

  if (route) {
    return (
      <Link
        href={route}
        className={className}
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        onClick={(e) => {
          e.preventDefault();
          navigateWithTransition(route);
        }}
      >
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      className={className}
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      {buttonContent}
    </button>
  );
});

AnimatedButton.displayName = 'AnimatedButton';

export default AnimatedButton;
