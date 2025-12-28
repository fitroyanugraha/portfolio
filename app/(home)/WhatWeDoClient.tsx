"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitTextAnimate from "@/components/SplitText/SplitText";
import { useMouseGlow } from "@/hooks/useMouseGlow";

const SKILLS = [
    "Video Editing",
    "Photo Editing",
    "Graphic Design",
    "Next js",
];

export default function WhatWeDoClient() {
    const tagsRef = useRef<HTMLDivElement>(null);
    const { handleMouseMove } = useMouseGlow();
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

    useGSAP(
        () => {
            if (!tagsRef.current) return;

            // Reveal the skill tags once when the section enters the viewport.
            const tags = tagsRef.current.querySelectorAll(".what-we-do-tag");
            gsap.set(tags, { opacity: 0, x: -40 });

            scrollTriggerRef.current?.kill();
            scrollTriggerRef.current = ScrollTrigger.create({
                trigger: tagsRef.current,
                start: "top 90%",
                once: true,
                animation: gsap.to(tags, {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                }),
            });

            return () => {
                scrollTriggerRef.current?.kill();
                scrollTriggerRef.current = null;
            };
        },
        { scope: tagsRef }
    );

    return (
        <section className="what-we-do">
            <div className="container">
                <div className="what-we-do-header">
                    <SplitTextAnimate delay={0.1}>
                        <h1>
                            <span className="spacer">&nbsp;</span>
                            Creativity isn&apos;t just skill. It&apos;s emotion, vision, and the
                            courage to shape ideas into something that moves people.
                        </h1>
                    </SplitTextAnimate>
                </div>
                <div className="what-we-do-content">
                    <div className="what-we-do-col">
                        <SplitTextAnimate delay={0.1}>
                            <p>How I approach</p>
                        </SplitTextAnimate>

                        <SplitTextAnimate delay={0.15}>
                            <p className="lg">
                                I start every project with curiosity and creativity. Blending
                                visuals, motion, and code, my goal is to create something that
                                connects, inspires, and looks damn good.
                            </p>
                        </SplitTextAnimate>
                    </div>
                    <div className="what-we-do-col">
                        <div className="what-we-do-tags" ref={tagsRef}>
                            {SKILLS.map((skill) => (
                                <div
                                    key={skill}
                                    className="what-we-do-tag"
                                    onMouseMove={handleMouseMove}
                                >
                                    <span className="tag-inner-glow"></span>
                                    <h3>{skill}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
