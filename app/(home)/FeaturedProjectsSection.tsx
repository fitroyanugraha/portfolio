"use client";
import { useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitTextAnimate from "@/components/SplitText/SplitText";
import SectionErrorBoundary from "@/components/ErrorBoundary/SectionErrorBoundary";

const FeaturedProjectsFallback = () => (
    <div
        style={{
            minHeight: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
    >
        <div className="loading-spinner">Loading projects...</div>
    </div>
);

const FeaturedProjects = dynamic(
    () => import("@/components/FeaturedProjects/FeaturedProjects"),
    {
        loading: FeaturedProjectsFallback,
        ssr: false,
    }
);

export default function FeaturedProjectsSection() {
    const featuredProjectsRef = useRef<HTMLDivElement>(null);
    const colorTweenRef = useRef<gsap.core.Tween | null>(null);

    useGSAP(
        () => {
            if (!featuredProjectsRef.current) return;

            // Color theme transition when the section enters/leaves the viewport.
            colorTweenRef.current?.kill();
            colorTweenRef.current = gsap.to(featuredProjectsRef.current, {
                backgroundColor: "rgb(241, 241, 241)",
                color: "rgb(20, 19, 19)",
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: featuredProjectsRef.current,
                    start: "top 70%",
                    once: true,
                },
            });

            return () => {
                colorTweenRef.current?.kill();
                colorTweenRef.current = null;
            };
        },
        { scope: featuredProjectsRef }
    );

    return (
        <section className="featured-projects-container">
            <div className="featured-projects-wrapper" ref={featuredProjectsRef}>
                <div className="container">
                    <div className="featured-projects-header-callout">
                        <SplitTextAnimate delay={0.1}>
                            <p>Featured work</p>
                        </SplitTextAnimate>
                    </div>
                    <div className="featured-projects-header">
                        <SplitTextAnimate delay={0.15}>
                            <h2>A collection of recent projects and completed solutions</h2>
                        </SplitTextAnimate>
                    </div>
                </div>
                <SectionErrorBoundary>
                    <FeaturedProjects />
                </SectionErrorBoundary>
            </div>
        </section>
    );
}
