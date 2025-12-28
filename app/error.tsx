"use client";

import { useEffect } from "react";
import AnimatedButton from "@/components/AnimatedButton/AnimatedButton";
import "@/components/ErrorBoundary/ErrorBoundary.css";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Application error:", error);
    }, [error]);

    return (
        <div className="error-boundary">
            <div className="error-content">
                <h1>Something went wrong</h1>
                <p>We encountered an unexpected error. Please try again.</p>
                <AnimatedButton
                    label="Try again"
                    animate={false}
                    animateOnScroll={false}
                    showIcon={false}
                    onClick={() => reset()}
                />
            </div>
        </div>
    );
}
