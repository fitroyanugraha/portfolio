import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
    title: "Projects | Fitroya Nugraha",
    description: "Explore case studies by Fitroya Nugraha across video editing, graphic design, and Next.js web development.",
    path: "/projects",
    image: "/projects/kriplix.webp",
});

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
