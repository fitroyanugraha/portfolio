"use client";

import "./ComingSoonModal.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Clock } from "lucide-react";
import AnimatedButton from "@/components/AnimatedButton/AnimatedButton";

interface ComingSoonModalProps {
    projectName: string;
    projectType: string;
}

export default function ComingSoonModal({ projectName, projectType }: ComingSoonModalProps) {
    const router = useRouter();

    useEffect(() => {
        if (typeof document === "undefined") return;

        document.body.dataset.comingSoon = "true";
        window.dispatchEvent(new Event("coming-soon:change"));

        return () => {
            delete document.body.dataset.comingSoon;
            window.dispatchEvent(new Event("coming-soon:change"));
        };
    }, []);

    const handleBack = () => {
        router.back();
    };

    return (
        <div className="coming-soon-page">
            <div className="coming-soon-container">
                <div className="coming-soon-card">
                    <div className="coming-soon-icon" aria-hidden="true">
                        <Clock size={76} strokeWidth={1.5} />
                    </div>

                    <div className="coming-soon-text">
                        <h1>Coming Soon</h1>
                        <h3>{projectName}</h3>
                        <p>
                            This project showcase is currently under development.
                            Check back soon for a detailed case study of this {projectType.toLowerCase()}.
                        </p>
                    </div>

                    <div className="coming-soon-action">
                        <AnimatedButton
                            label="Go Back"
                            animate={false}
                            animateOnScroll={false}
                            iconDirection="left"
                            onClick={handleBack}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
