"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HowWeWorkCard } from "./howWeWorkData";

interface HowWeWorkCardsProps {
  cards: HowWeWorkCard[];
  isMobile: boolean;
  onActiveStepChange?: (index: number) => void;
}

const HowWeWorkCards = ({ cards, isMobile, onActiveStepChange }: HowWeWorkCardsProps) => {
  const cardsRef = useRef<HTMLDivElement>(null);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const cardsContainer = cardsRef.current;
    if (!cardsContainer) return;

    // Stacked card animation for mobile & tablet
    if (isMobile) {
      const cardElements = cardsContainer.querySelectorAll(".how-we-work-card");

      const setStackState = (activeIndex: number) => {
        // Kill any in-flight tweens to avoid stacking/queueing work on mobile.
        gsap.killTweensOf(cardElements);

        cardElements.forEach((cardEl, index) => {
          if (index === activeIndex) return;

          if (index < activeIndex) {
            const depthLevel = activeIndex - index;
            gsap.set(cardEl, {
              y: depthLevel * 8,
              scale: 1 - depthLevel * 0.03,
              filter: `brightness(${1 - depthLevel * 0.15})`,
              boxShadow: `0 ${8 - depthLevel * 2}px ${24 - depthLevel * 4}px rgba(0, 0, 0, ${0.2 - depthLevel * 0.04})`,
              overwrite: true,
            });
          } else {
            // Cards after the active one stay at baseline.
            gsap.set(cardEl, {
              y: 0,
              scale: 1,
              filter: "brightness(1)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
              overwrite: true,
            });
          }
        });
      };

      cardElements.forEach((card, index) => {
        const stackTrigger = ScrollTrigger.create({
          trigger: card,
          start: "top 70%",
          end: "top 20%",
          onEnter: () => {
            setStackState(index);
            // Current card: full prominence
            gsap.to(card, {
              y: 0,
              scale: 1,
              filter: "brightness(1)",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.35)",
              duration: 0.4,
              ease: "power2.out",
              overwrite: "auto",
            });
          },
          onLeave: () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              filter: "brightness(1)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
              duration: 0.3,
              ease: "power1.inOut",
              overwrite: "auto",
            });
          },
          onEnterBack: () => {
            setStackState(index);
            gsap.to(card, {
              y: 0,
              scale: 1,
              filter: "brightness(1)",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.35)",
              duration: 0.4,
              ease: "power2.out",
              overwrite: "auto",
            });
          },
          onLeaveBack: () => {
            // When scrolling back up, restack relative to previous active card.
            setStackState(Math.max(0, index - 1));
            gsap.to(card, {
              y: 0,
              scale: 1,
              filter: "brightness(1)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
              duration: 0.3,
              ease: "power1.inOut",
              overwrite: "auto",
            });
          },
        });
        scrollTriggersRef.current.push(stackTrigger);
      });
    } else {
      // Desktop: Track active step
      const cardElements = cardsContainer.querySelectorAll(".how-we-work-card");

      cardElements.forEach((card, index) => {
        const cardTrigger = ScrollTrigger.create({
          trigger: card,
          start: "top center",
          end: "bottom center",
          onEnter: () => onActiveStepChange?.(index),
          onEnterBack: () => onActiveStepChange?.(index),
          onLeave: () => {
            if (index < cardElements.length - 1) {
              onActiveStepChange?.(index + 1);
            }
          },
          onLeaveBack: () => {
            if (index > 0) {
              onActiveStepChange?.(index - 1);
            }
          },
        });
        scrollTriggersRef.current.push(cardTrigger);
      });
    }

    return () => {
      scrollTriggersRef.current.forEach((trigger) => trigger.kill());
      scrollTriggersRef.current = [];
    };
  }, [isMobile, onActiveStepChange]);

  return (
    <div className="how-we-work-col how-we-work-cards" ref={cardsRef}>
      {cards.map((card, index) => (
        <div key={index} className="how-we-work-card">
          <div className="how-we-work-card-img">
            <Image src={card.imageSrc} alt={card.imageAlt} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
          <div className="how-we-work-card-copy">
            <div className="how-we-work-card-index-label">
              <h3>{card.title}</h3>
            </div>
            <p className="md">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HowWeWorkCards;
