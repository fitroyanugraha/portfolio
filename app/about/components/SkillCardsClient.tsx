import AnimatedItem from "@/components/AnimateItem/AnimateItem";
import type { ReactElement } from "react";
import {
    SiAdobeaftereffects,
    SiAdobeillustrator,
    SiAdobepremierepro,
    SiAdobephotoshop,
    SiFigma,
    SiJavascript,
    SiNextdotjs,
    SiReact,
    SiTypescript,
} from "react-icons/si";
import { Clapperboard, Scissors, Palette } from "lucide-react";

type SkillTool = {
    icon: ReactElement;
    name: string;
};

type SkillCard = {
    icon: ReactElement;
    title: string;
    description: string;
    tools: SkillTool[];
};

const SKILLS_DATA = [
    {
        icon: <Clapperboard size={32} />,
        title: "Video Editing",
        description: "Crafting compelling visual narratives through professional editing.",
        tools: [
            { icon: <SiAdobepremierepro size={16} />, name: "Premiere Pro" },
            { icon: <Clapperboard size={16} />, name: "DaVinci Resolve" },
            { icon: <SiAdobeaftereffects size={16} />, name: "After Effects" },
            { icon: <Scissors size={16} />, name: "CapCut" },
        ],
    },
    {
        icon: <SiAdobephotoshop size={32} />,
        title: "Graphic Design",
        description:
            "Creating impactful visual identities that communicate with clarity and creativity.",
        tools: [
            { icon: <SiAdobephotoshop size={16} />, name: "Photoshop" },
            { icon: <SiAdobeillustrator size={16} />, name: "Illustrator" },
            { icon: <SiFigma size={16} />, name: "Figma" },
            { icon: <Palette size={16} />, name: "Canva" },
        ],
    },
    {
        icon: <SiReact size={32} />,
        title: "Web Dev.",
        description:
            "Building modern web applications with clean code and seamless user experiences.",
        tools: [
            { icon: <SiJavascript size={16} />, name: "JavaScript" },
            { icon: <SiTypescript size={16} />, name: "TypeScript" },
            { icon: <SiReact size={16} />, name: "React" },
            { icon: <SiNextdotjs size={16} />, name: "Next.js" },
        ],
    },
] satisfies SkillCard[];

export default function SkillCardsClient() {
    return (
        <div className="skills-grid">
            {SKILLS_DATA.map((skill, index) => (
                <AnimatedItem
                    key={skill.title}
                    delay={index * 0.10}
                    distance={40}
                    duration={0.3}
                    scrollStart="top 85%"
                >
                    <div className="skill-card">
                        <div className="skill-card-header">
                            <div className="skill-icon">{skill.icon}</div>
                            <h3 className="skill-card-title">{skill.title}</h3>
                            <p className="skill-card-description">{skill.description}</p>
                        </div>
                        <div className="skill-tools">
                            {skill.tools.map((tool) => (
                                <div key={`${skill.title}-${tool.name}`} className="tool-tag">
                                    {tool.icon}
                                    <span>{tool.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedItem>
            ))}
        </div>
    );
}
