"use client";
import "./TopBar.css";

import { useRef, useEffect } from "react";
import Image from "next/image";

import gsap from "gsap";

import { useViewTransition } from "@/hooks/useViewTransition";
import AnimatedButton from "../AnimatedButton/AnimatedButton";

const TopBar = () => {
  const topBarRef = useRef<HTMLDivElement>(null);
  const { navigateWithTransition } = useViewTransition();
  let lastScrollY = 0;
  let isScrolling = false;

  useEffect(() => {
    const topBar = topBarRef.current;
    if (!topBar) return;

    const topBarHeight = topBar.offsetHeight;

    gsap.set(topBar, { y: 0 });

    const handleScroll = () => {
      if (isScrolling) return;

      isScrolling = true;
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? 1 : -1;

      if (direction === 1 && currentScrollY > 50) {
        gsap.to(topBar, {
          y: -topBarHeight,
          duration: 1,
          ease: "power4.out",
        });
      } else if (direction === -1) {
        gsap.to(topBar, {
          y: 0,
          duration: 1,
          ease: "power4.out",
        });
      }

      lastScrollY = currentScrollY;

      setTimeout(() => {
        isScrolling = false;
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (topBarRef.current) {
      gsap.set(topBarRef.current, { y: 0 });
    }
  });

  return (
    <div className="top-bar" ref={topBarRef}>
      <div className="top-bar-logo">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigateWithTransition("/");
          }}
          aria-label="Navigate to homepage"
        >
          <Logo />
        </a>
      </div>
      <div className="top-bar-cta">
        <AnimatedButton label="Contact Me" route="/connect" animate={false} />
      </div>
    </div>
  );
};

export default TopBar;

const Logo = () => {
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    const handleMouseEnter = () => {
      gsap.to(logo, {
        rotation: 180,
        scale: 1.1,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(logo, {
        rotation: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    logo.addEventListener("mouseenter", handleMouseEnter);
    logo.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      logo.removeEventListener("mouseenter", handleMouseEnter);
      logo.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <Image
      ref={logoRef}
      src="/assets/star.svg"
      alt="Fitroya Nugraha Logo"
      width={70}
      height={70}
      style={{ display: 'block', cursor: 'pointer' }}
      priority
    />
  );
};
