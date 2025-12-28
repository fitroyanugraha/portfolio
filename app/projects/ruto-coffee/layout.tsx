import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
    title: "Ruto Coffee | Branding & Social Media | Fitroya Nugraha",
    description: "Ruto Coffee case study: branding and social media design including menu layout, posters, and Instagram story content.",
    path: "/projects/ruto-coffee",
    image: "/projects/ruto.webp",
});

export default function RutoCoffeeLayout({ children }: { children: React.ReactNode }) {
    return children;
}
