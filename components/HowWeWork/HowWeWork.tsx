"use client";
import "./HowWeWork.css";

import React, { useEffect, useRef, useState, useCallback } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import SplitTextAnimate from "../SplitText/SplitText";
import HowWeWorkCards from "./HowWeWorkCards";
import { howWeWorkCards } from "./howWeWorkData";

const HowWeWork = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  const trackScrollTrigger = (trigger?: ScrollTrigger | null) => {
    if (!trigger) return;
    scrollTriggersRef.current.push(trigger);
  };

  const STEPS = [0, 1, 2, 3] as const;

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth <= 1000);
  }, []);

  useEffect(() => {
    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [checkMobile]);

  useGSAP(
    () => {
      if (!stepsRef.current) return;

      const steps = stepsRef.current.querySelectorAll(".how-we-work-step");
      gsap.set(steps, { opacity: 0, x: -40 });

      const trigger = ScrollTrigger.create({
        trigger: stepsRef.current,
        start: "top 75%",
        once: true,
        animation: gsap.to(steps, {
          opacity: 1,
          x: 0,
          duration: 0.3,
          stagger: -0.1,
          ease: "none",
        }),
      });

      trackScrollTrigger(trigger);

      return () => {
        trigger.kill();
      };
    },
    { scope: stepsRef }
  );

  useEffect(() => {
    const container = containerRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!container || !header || !cards) return;

    // Color change scroll trigger
    const parentSection = container.closest(".how-we-work-container");
    if (parentSection) {
      const colorTrigger = gsap.to(parentSection, {
        backgroundColor: "rgb(20, 19, 19)", // var(--base-500)
        color: "rgb(242, 237, 230)", // var(--base-100)
        scrollTrigger: {
          trigger: parentSection,
          start: "top 60%",
          end: "top 20%",
          scrub: 1,
        },
      });
      trackScrollTrigger(colorTrigger.scrollTrigger as ScrollTrigger);
    }

    if (!isMobile) {
      const mainTrigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        endTrigger: cards,
        end: "bottom bottom",
        pin: header,
        pinSpacing: false,
      });
      trackScrollTrigger(mainTrigger);
    }

    return () => {
      scrollTriggersRef.current.forEach((trigger) => trigger.kill());
      scrollTriggersRef.current = [];
    };
  }, [isMobile]);

  return (
    <div className="how-we-work" ref={containerRef}>
      <div className="how-we-work-col how-we-work-header" ref={headerRef}>
        <div className="container">
          <div className="how-we-work-header-content">
            <div className="how-we-work-header-callout">
              <SplitTextAnimate delay={0.1}>
                <p>Process in focus</p>
              </SplitTextAnimate>
            </div>
            <SplitTextAnimate delay={0.15}>
              <h3>
                From concept to completion, my creative process brings structure
                to every project.
              </h3>
            </SplitTextAnimate>
            <div className="how-we-work-steps" ref={stepsRef}>
              {STEPS.map((stepIndex) => (
                <div
                  key={stepIndex}
                  className={`how-we-work-step ${activeStep === stepIndex ? "active" : ""
                    }`}
                >
                  <p className="how-we-work-step-label">Step</p>
                  <p className="how-we-work-step-index">{stepIndex + 1}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div ref={cardsRef}>
        <HowWeWorkCards
          cards={howWeWorkCards}
          isMobile={isMobile}
          onActiveStepChange={setActiveStep}
        />
      </div>
    </div>
  );
});

HowWeWork.displayName = 'HowWeWork';

export default HowWeWork;
