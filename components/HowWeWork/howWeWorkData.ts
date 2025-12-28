export interface HowWeWorkCard {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export const howWeWorkCards: HowWeWorkCard[] = [
  {
    title: "Briefing & Research",
    description: "Every project begins with understanding your vision, audience, and goals. From video to design to web, I research, plan, and align everything from the very start.",
    imageSrc: "/how-we-work/briefing-research.svg",
    imageAlt: "Briefing and Research illustration",
  },
  {
    title: "Planning & Structure",
    description: "I define the creative direction and technical plan. For videos, that means storyboards and shot lists. For graphics, wireframes and mood boards. For web, structure and user flow. This stage lays the groundwork for everything that follows.",
    imageSrc: "/how-we-work/planning-structure.svg",
    imageAlt: "Planning and Structure illustration",
  },
  {
    title: "Creation & Execution",
    description: "This is where vision turns into reality. I edit in Premiere Pro, design in Photoshop and Illustrator, and build responsive apps with React and Next.js. Every detail is crafted to align with the creative and technical goals.",
    imageSrc: "/how-we-work/creation-execution.svg",
    imageAlt: "Creation and Execution illustration",
  },
  {
    title: "Refinement & Delivery",
    description: "Every project is refined with precision and care. Videos get their final color and sound balance, visuals are perfected for every platform, and web apps are tested for flawless performance. The final deliverable is polished, optimized, and ready to make an impact.",
    imageSrc: "/how-we-work/refinement-delivery.svg",
    imageAlt: "Refinement and Delivery illustration",
  },
];
