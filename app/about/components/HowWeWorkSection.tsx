"use client";
import dynamic from "next/dynamic";
import SectionErrorBoundary from "@/components/ErrorBoundary/SectionErrorBoundary";

const HowWeWorkFallback = () => (
    <div
        style={{
            minHeight: "600px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
    >
        <div className="loading-spinner">Loading workflow...</div>
    </div>
);

const HowWeWork = dynamic(
    () => import("@/components/HowWeWork/HowWeWork"),
    {
        loading: HowWeWorkFallback,
        ssr: false,
    }
);

export default function HowWeWorkSection() {
    return (
        <section className="how-we-work-container">
            <div className="container">
                <SectionErrorBoundary>
                    <HowWeWork />
                </SectionErrorBoundary>
            </div>
        </section>
    );
}
