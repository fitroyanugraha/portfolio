"use client";
import styles from "./FeaturedProjects.module.css";
import featuredProjectsContent from "./featured-projects-content";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useViewTransition } from "@/hooks/useViewTransition";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FeaturedProjects = () => {
  const { navigateWithTransition } = useViewTransition();
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  const trackScrollTrigger = (trigger?: ScrollTrigger | null) => {
    if (!trigger) return;
    scrollTriggersRef.current.push(trigger);
  };

  useEffect(() => {
    const featuredProjectCards = gsap.utils.toArray<HTMLElement>(
      `.${styles["featured-project-card"]}`
    );

    const isMobile = window.innerWidth <= 767;

    if (isMobile) {
      // Mobile: Simple fade-in animations for centered cards
      featuredProjectCards.forEach((featuredProjectCard) => {
        const featuredProjectCardInner = featuredProjectCard.querySelector(
          `.${styles["featured-project-card-inner"]}`
        );

        const tween = gsap.fromTo(
          featuredProjectCardInner,
          {
            y: 60,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: featuredProjectCard,
              start: "top 80%",
              once: true,
            },
          }
        );
        trackScrollTrigger(tween.scrollTrigger as ScrollTrigger);
      });
    } else {
      // Desktop: 3D pinning animations
      featuredProjectCards.forEach((featuredProjectCard, index) => {
        if (index < featuredProjectCards.length - 1) {
          const featuredProjectCardInner = featuredProjectCard.querySelector(
            `.${styles["featured-project-card-inner"]}`
          );

          const tween1 = gsap.fromTo(
            featuredProjectCardInner,
            {
              y: "0%",
              z: 0,
              rotationX: 0,
              scale: 1,
              opacity: 1,
            },
            {
              y: "-25%",
              z: -400,
              rotationX: 35,
              scale: 0.95,
              opacity: 0,
              ease: "power1.inOut",
              scrollTrigger: {
                trigger: featuredProjectCards[index + 1],
                start: "top 100%",
                end: "top 0%",
                scrub: 0.5,
                pin: featuredProjectCard,
                pinSpacing: false,
              },
            }
          );
          trackScrollTrigger(tween1.scrollTrigger as ScrollTrigger);

          const tween2 = gsap.to(featuredProjectCardInner, {
            "--after-opacity": 0.6,
            "--shadow-opacity": 0,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: featuredProjectCards[index + 1],
              start: "top 80%",
              end: "top 20%",
              scrub: 0.5,
            },
          });
          trackScrollTrigger(tween2.scrollTrigger as ScrollTrigger);
        }
      });
    }

    return () => {
      scrollTriggersRef.current.forEach((trigger) => trigger.kill());
      scrollTriggersRef.current = [];
    };
  }, []);

  return (
    <div className={`${styles["featured-projects"]} featured-projects`}>
      {featuredProjectsContent.map((project) => (
        <div
          key={project.title}
          className={`${styles["featured-project-card"]} featured-project-card`}
        >
          <div
            className={`${styles["featured-project-card-inner"]} featured-project-card-inner`}
          >
            <div
              className={`${styles["featured-project-card-content"]} featured-project-card-content`}
            >
              <div
                className={`${styles["featured-project-card-info"]} featured-project-card-info`}
              >
                <p>{project.info}</p>
              </div>
              <div
                className={`${styles["featured-project-card-content-main"]} featured-project-card-content-main`}
              >
                <div
                  className={`${styles["featured-project-card-title"]} featured-project-card-title`}
                >
                  <h2>{project.title}</h2>
                </div>
                <div
                  className={`${styles["featured-project-card-description"]} featured-project-card-description`}
                >
                  <p className="lg">{project.description}</p>
                </div>
              </div>
            </div>
            <div
              className={`${styles["featured-project-card-img"]} featured-project-card-img`}
              onClick={() => navigateWithTransition(project.route)}
              style={{ cursor: "pointer" }}
            >
              <Image
                src={project.image}
                alt={project.title}
                width={1024}
                height={682}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProjects;
