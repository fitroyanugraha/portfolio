import SplitTextAnimate from "@/components/SplitText/SplitText";
import dynamic from "next/dynamic";

const SkillCardsClient = dynamic(() => import("./SkillCardsClient"));

export default function SkillsSection() {
    return (
        <section className="skills-section">
            <div className="container">
                <div className="skills-header">
                    <SplitTextAnimate delay={0.1}>
                        <h2 className="skills-title">Skills & Tools</h2>
                    </SplitTextAnimate>
                    <SplitTextAnimate delay={0.15}>
                        <p className="skills-intro">
                            A versatile toolkit combining creative vision with technical
                            execution, from storytelling through video to building digital
                            experiences.
                        </p>
                    </SplitTextAnimate>
                </div>
                <SkillCardsClient />
            </div>
        </section>
    );
}
