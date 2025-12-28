import { projectsData } from "@/app/projects/projectsData";

export interface FeaturedProject {
  info: string;
  title: string;
  description: string;
  image: string;
  route: string;
}

const projectsRouteById = new Map(projectsData.map((project) => [project.id, project.route] as const));

const featuredProjectsContent: FeaturedProject[] = [
  {
    info: 'Bold storytelling meets cinematic creativity.',
    title: "Kriplix",
    description: "A YouTube channel that reimagines film reviews with personality, humor, and cinematic flair. Where every story gets a new life through fresh perspectives and sharp editing that resonates with movie lovers.",
    image: '/projects/kriplix.webp',
    route: projectsRouteById.get(1) ?? "/projects",
  },
  {
    info: "Visual identity that brings warmth to every scroll.",
    title: "Ruto Coffee",
    description:
      "A comprehensive branding project spanning menu layouts, promotional materials, and social media presence. The design blends Japanese-inspired minimalism with cozy café aesthetics, creating a cohesive identity that feels both refined and inviting.",
    image: "/projects/ruto.webp",
    route: projectsRouteById.get(2) ?? "/projects",
  },
  {
    info: "Contemporary design meets coffee culture.",
    title: "Le.Coh Coffeeshop",
    description:
      "Complete brand identity from logo design to social media content and video reels. The design direction embraces minimalism and bold contrast, reflecting Le.Coh's clean aesthetic and contemporary coffee culture with striking visual impact.",
    image: "/projects/lecoh.webp",
    route: projectsRouteById.get(3) ?? "/projects",
  },
  {
    info: 'Personal micro-site built for seamless connection.',
    title: "Linktree Web App",
    description:
      "A custom link-in-bio platform built with React and Vite. Features deep linking, anonymous messaging, and a clean responsive design. Optimized for speed, SEO, and PWA functionality—simple, modern, and effortlessly personal.",
    image: "/projects/linktree-web-app.webp",
    route: projectsRouteById.get(4) ?? "/projects",
  },
  {
    info: 'Real-time ordering system for modern cafés.',
    title: "Scan To Order",
    description:
      "A full-stack web app for coffee shop management built with Next.js, TypeScript, and Socket.IO. Features live order tracking, QR table codes, and real-time synchronization between admin and customers. Optimized for PWA, mobile experience, and seamless UX—fast, intuitive, and scalable.",
    image: "/projects/order-system.webp",
    route: projectsRouteById.get(5) ?? "/projects",
  },
];

export default featuredProjectsContent;
