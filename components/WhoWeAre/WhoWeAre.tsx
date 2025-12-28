"use client";
import "./WhoWeAre.css";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { prefersReducedMotion } from "@/lib/animations";

const WhoWeAre = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      if (prefersReducedMotion()) return;

      const isMobile = window.innerWidth <= 767;
      if (isMobile) return;

      const whoweareContainer = section.querySelector(".whoweare-container") as HTMLElement | null;
      const whoweareScroll = section.querySelector(".whoweare-scroll") as HTMLElement | null;
      if (!whoweareContainer || !whoweareScroll) return;

      const images = [
        { id: "#whoweare-img-1", endTranslateX: -800 },
        { id: "#whoweare-img-2", endTranslateX: -1200 },
        { id: "#whoweare-img-3", endTranslateX: -600 },
        { id: "#whoweare-img-4", endTranslateX: -1000 },
        { id: "#whoweare-img-5", endTranslateX: -900 },
      ];

      const scrollTriggers: ScrollTrigger[] = [];

      const setClipPath = (value: string) => {
        whoweareContainer.style.clipPath = value;
      };

      const setScrollOpacity = gsap.quickSetter(whoweareScroll, "opacity");
      const setScrollScale = gsap.quickSetter(whoweareScroll, "scale");
      const setScrollX = gsap.quickSetter(whoweareScroll, "x", "px");

      const imageSetters = images
        .map((img) => {
          const el = section.querySelector(img.id) as HTMLElement | null;
          if (!el) return null;
          return {
            endTranslateX: img.endTranslateX,
            setX: gsap.quickSetter(el, "x", "px"),
          };
        })
        .filter(Boolean) as Array<{ endTranslateX: number; setX: (value: number) => void }>;

      let maxTranslateX = 0;
      let maxTranslateAtTarget = 0;

      const recalc = () => {
        const containerWidth = whoweareScroll.offsetWidth;
        const viewportWidth = window.innerWidth;
        maxTranslateX = containerWidth - viewportWidth;
        maxTranslateAtTarget = maxTranslateX;
      };

      recalc();

      const clipTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: () => `bottom+=${window.innerHeight * 2} top`,
        scrub: 1,
        onUpdate: (self) => {
          const clipPathValue = Math.min(self.progress * 100, 100);
          setClipPath(`circle(${clipPathValue}% at 50% 50%)`);
        },
      });
      scrollTriggers.push(clipTrigger);

      const mainTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight * 6}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 0.5,
        invalidateOnRefresh: true,
        onRefreshInit: recalc,
        onUpdate: (self) => {
          const progress = self.progress;

          let opacity: number;
          let scale: number;
          let translateX: number;

          if (progress <= 0.3) {
            const fadeProgress = progress / 0.3;
            opacity = fadeProgress;
            scale = 0.85 + 0.15 * fadeProgress;
            translateX = 0;
          } else {
            opacity = 1;
            scale = 1;
            const adjustedProgress = (progress - 0.3) / (1 - 0.3);
            translateX = -Math.min(adjustedProgress * maxTranslateAtTarget, maxTranslateX);
          }

          setScrollOpacity(opacity);
          setScrollScale(scale);
          setScrollX(translateX);

          if (progress >= 0.3) {
            const adjustedProgress = (progress - 0.3) / (1 - 0.3);
            for (const img of imageSetters) {
              img.setX(img.endTranslateX * adjustedProgress);
            }
          }
        },
      });
      scrollTriggers.push(mainTrigger);

      return () => {
        scrollTriggers.forEach((t) => t.kill());
      };
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section className="whoweare" ref={sectionRef}>
      <div className="whoweare-container">
        <div className="whoweare-scroll">
          <div className="whoweare-header">
            <h1>Who we are</h1>
          </div>

          <div className="whoweare-img" id="whoweare-img-1">
            <Image src="/images/who-we-are/team-1.webp" alt="Team member 1" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
          <div className="whoweare-img" id="whoweare-img-2">
            <Image src="/images/who-we-are/team-2.webp" alt="Team member 2" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
          <div className="whoweare-img" id="whoweare-img-3">
            <Image src="/images/who-we-are/team-3.webp" alt="Team member 3" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
          <div className="whoweare-img" id="whoweare-img-4">
            <Image src="/images/who-we-are/team-4.webp" alt="Team member 4" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
          <div className="whoweare-img" id="whoweare-img-5">
            <Image src="/images/who-we-are/team-5.webp" alt="Team member 5" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
