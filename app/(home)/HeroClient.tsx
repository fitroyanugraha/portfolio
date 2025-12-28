"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitTextAnimate from "@/components/SplitText/SplitText";
import AnimatedButton from "@/components/AnimatedButton/AnimatedButton";

const PRELOADER_FALLBACK_MS = 3500;

const HERO_BG_INITIAL_WITH_PRELOADER = {
    opacity: 0.78,
    scale: 1.1,
    transformOrigin: "50% 50%",
} as const;

const HERO_BG_FINAL = {
    opacity: 1,
    scale: 1,
    transformOrigin: "50% 50%",
} as const;

const HERO_BG_TIMING = {
    delay: 1.9,
    fadeDuration: 3,
    scaleDuration: 1.5,
} as const;

type SequenceSource = "event" | "fallback";

const getHeroDelays = (sequenceStarted: boolean, hadPreloader: boolean) => {
    if (!sequenceStarted) {
        return {
            headerDelay: 999,
            taglineDelay: 999,
            buttonDelay: 999,
        };
    }

    const pauseAfterReveal = hadPreloader ? 0.75 : 0.25;
    const headerGap = hadPreloader ? 0.85 : 0.45;
    const taglineGap = hadPreloader ? 0.95 : 0.45;

    const headerDelay = pauseAfterReveal;
    const taglineDelay = headerDelay + headerGap;
    const buttonDelay = taglineDelay + taglineGap;

    return {
        headerDelay,
        taglineDelay,
        buttonDelay,
    };
};

export default function HeroClient() {
    const heroBgRef = useRef<HTMLDivElement>(null);
    const sequenceStartedRef = useRef(false);

    const [sequenceStarted, setSequenceStarted] = useState(false);
    const [hadPreloader, setHadPreloader] = useState(false);
    const [hasPreloader, setHasPreloader] = useState(false);

    useEffect(() => {
        const startSequence = (source: SequenceSource) => {
            if (sequenceStartedRef.current) return;
            sequenceStartedRef.current = true;
            setSequenceStarted(true);
            setHadPreloader(source === "event");
        };

        // Starts when the preloader dispatches its completion event.
        const onPreloaderComplete = () => startSequence("event");
        window.addEventListener("preloaderComplete", onPreloaderComplete);

        // Detect whether the preloader exists on this route.
        const preloaderExists = !!document.querySelector(".loader");
        setHasPreloader(preloaderExists);
        if (!preloaderExists) {
            startSequence("fallback");
        }

        // Safety net: if the event never fires, proceed after a fixed timeout.
        const fallbackTimer = window.setTimeout(() => {
            startSequence("fallback");
        }, PRELOADER_FALLBACK_MS);

        return () => {
            window.removeEventListener("preloaderComplete", onPreloaderComplete);
            window.clearTimeout(fallbackTimer);
        };
    }, []);

    useGSAP(
        () => {
            if (!heroBgRef.current) return;

            gsap.killTweensOf(heroBgRef.current);

            if (!hasPreloader) {
                gsap.set(heroBgRef.current, HERO_BG_FINAL);
                return;
            }

            gsap.set(heroBgRef.current, HERO_BG_INITIAL_WITH_PRELOADER);

            const tl = gsap.timeline({ delay: HERO_BG_TIMING.delay });
            tl.to(heroBgRef.current, {
                opacity: HERO_BG_FINAL.opacity,
                duration: HERO_BG_TIMING.fadeDuration,
                ease: "power2.out",
            }).to(
                heroBgRef.current,
                {
                    scale: HERO_BG_FINAL.scale,
                    duration: HERO_BG_TIMING.scaleDuration,
                    ease: "power3.out",
                },
                0
            );
        },
        { scope: heroBgRef, dependencies: [hasPreloader] }
    );

    const delays = useMemo(
        () => getHeroDelays(sequenceStarted, hadPreloader),
        [sequenceStarted, hadPreloader]
    );

    return (
        <section className="hero">
            <div className="hero-bg" ref={heroBgRef}>
                <Image
                    src="/home/piter.webp"
                    alt="Fitroya Nugraha Saleh Portfolio Hero"
                    fill
                    priority
                    sizes="100vw"
                    placeholder="blur"
                    blurDataURL="data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoKAAgAAUAmJaQAA3AA/vuUAAA="
                    style={{ objectFit: "cover" }}
                />
            </div>
            <div className="hero-gradient"></div>
            <div className="hero-content">
                <div className="container">
                    {sequenceStarted ? (
                        <>
                            <div className="hero-header">
                                <SplitTextAnimate animateOnScroll={false} delay={delays.headerDelay}>
                                    <h1>every pixel tells a story meant to be felt.</h1>
                                </SplitTextAnimate>
                            </div>
                            <div className="hero-tagline">
                                <SplitTextAnimate animateOnScroll={false} delay={delays.taglineDelay}>
                                    <p>
                                        Behind editing, design, and line of code, there&apos;s a story
                                        that feels human, honest, and alive.
                                    </p>
                                </SplitTextAnimate>
                            </div>
                            <AnimatedButton
                                label="Discover More"
                                route="/about"
                                animateOnScroll={false}
                                delay={delays.buttonDelay}
                            />
                        </>
                    ) : null}
                </div>
            </div>
        </section>
    );
}
