import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import AnimatedButton from "@/components/AnimatedButton/AnimatedButton";
import "@/components/ErrorBoundary/ErrorBoundary.css";

export const metadata: Metadata = generateMetadata({
    title: "404 - Page Not Found",
    description: "The page you requested could not be found.",
    path: "/404",
    noIndex: true,
});

export default function NotFound() {
    return (
        <div className="error-boundary">
            <div className="error-content not-found">
                <h1>404</h1>
                <p>The page you're looking for doesn't exist or has been moved.</p>
                <AnimatedButton
                    label="Go Home"
                    route="/"
                    animate={false}
                    animateOnScroll={false}
                    iconDirection="left"
                />
            </div>
        </div>
    );
}
