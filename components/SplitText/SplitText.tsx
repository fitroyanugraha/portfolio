"use client";
import "./SplitText.css";
import React, { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import type { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface SplitTextAnimateProps {
    children: React.ReactNode;
    animateOnScroll?: boolean;
    delay?: number;
}

export default function SplitTextAnimate({ children, animateOnScroll = true, delay = 0 }: SplitTextAnimateProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const splitRefs = useRef<SplitText[]>([]);
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

    useGSAP(
        () => {
            if (!containerRef.current) return;

            const initSplit = () => {

                splitRefs.current = [];
                const allLines: HTMLElement[] = [];

                const elements = Array.from(containerRef.current!.children) as HTMLElement[];

                elements.forEach((element) => {
                    element.style.visibility = 'visible';
                    element.style.overflow = 'hidden';

                    const split = new SplitText(element, {
                        type: "lines",
                        linesClass: "line++",
                        lineThreshold: 0.1,
                    });

                    splitRefs.current.push(split);

                    const computedStyle = window.getComputedStyle(element);
                    const textIndent = computedStyle.textIndent;

                    if (textIndent && textIndent !== "0px") {
                        if (split.lines.length > 0) {
                            (split.lines[0] as HTMLElement).style.paddingLeft = textIndent;
                        }
                        element.style.textIndent = "0";
                    }

                    allLines.push(...(split.lines as HTMLElement[]));
                });

                gsap.set(allLines, { y: "110%", opacity: 0 });

                const restoreOverflow = () => {
                    elements.forEach((el) => {
                        el.style.overflow = 'visible';
                    });
                };

                const animConfig = {
                    y: "0%",
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    delay,
                };

                if (animateOnScroll) {
                    const triggerElement = elements[0] || containerRef.current;
                    const tween = gsap.to(allLines, {
                        ...animConfig,
                        onComplete: restoreOverflow,
                        scrollTrigger: {
                            trigger: triggerElement,
                            start: "top 90%",
                            once: true,
                        },
                    });
                    scrollTriggerRef.current = tween.scrollTrigger as ScrollTrigger;
                } else {
                    gsap.to(allLines, {
                        ...animConfig,
                        onComplete: restoreOverflow,
                    });
                }
            };

            initSplit();

            return () => {
                splitRefs.current.forEach((split) => split?.revert());
                scrollTriggerRef.current?.kill();
                splitRefs.current = [];
                scrollTriggerRef.current = null;
            };
        },
        { scope: containerRef, dependencies: [animateOnScroll, delay] }
    );

    return (
        <div ref={containerRef} style={{ display: 'contents' }} data-split-hidden="true">
            {children}
        </div>
    );
}
