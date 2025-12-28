"use client";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

let isInitialLoad = true;

const PRELOADER_COMPLETE_EVENT = "preloaderComplete";
const HIDE_PRELOADER_DELAY_MS = 150;

export default function PreloaderClient() {
    const [showPreloader, setShowPreloader] = useState(isInitialLoad);
    const [loaderAnimating, setLoaderAnimating] = useState(false);
    const lenis = useLenis();

    // Gate the preloader to only run on the initial page load.
    useEffect(() => {
        return () => {
            isInitialLoad = false;
        };
    }, []);

    // Disable smooth scrolling while the preloader animation is running.
    useEffect(() => {
        if (!lenis) return;
        if (loaderAnimating) lenis.stop();
        else lenis.start();
    }, [lenis, loaderAnimating]);

    useGSAP(() => {
        if (!showPreloader) return;

        const tl = gsap.timeline({
            delay: 0.15,
            defaults: {
                ease: "hop",
            },
        });

        setLoaderAnimating(true);

        tl.to(".word h1", {
            y: "0%",
            duration: 0.65,
        });

        tl.to("#word-1 h1", {
            y: "120%",
            duration: 0.65,
            delay: 0.3,
        });

        tl.to(
            "#word-2 h1",
            {
                y: "-120%",
                duration: 0.65,
            },
            "<"
        );

        tl.to(
            ".block",
            {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                duration: 0.8,
                stagger: 0.1,
                delay: 0.35,
                onComplete: () => {
                    gsap.set(".loader", { pointerEvents: "none" });
                    setLoaderAnimating(false);

                    isInitialLoad = false;

                    // Notify HeroClient (and any listeners) that the preloader is complete.
                    window.dispatchEvent(new CustomEvent(PRELOADER_COMPLETE_EVENT));

                    window.setTimeout(() => {
                        setShowPreloader(false);
                    }, HIDE_PRELOADER_DELAY_MS);
                },
            },
            "<"
        );
    }, [showPreloader]);

    if (!showPreloader) return null;

    return (
        <div className="loader">
            <div className="overlay">
                <div className="block"></div>
                <div className="block"></div>
            </div>
            <div className="intro-logo">
                <div className="word" id="word-1">
                    <h1>
                        <span>Fitroya</span>
                    </h1>
                </div>
                <div className="word" id="word-2">
                    <h1>Nugraha</h1>
                </div>
            </div>
        </div>
    );
}
