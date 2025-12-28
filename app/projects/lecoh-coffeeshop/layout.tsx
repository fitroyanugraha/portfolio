import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
    title: "Le.Coh Coffeeshop | Visual Identity | Fitroya Nugraha",
    description: "Le.Coh case study: visual identity, logo, social media content, and reels for a contemporary coffeeshop brand.",
    path: "/projects/lecoh-coffeeshop",
    image: "/projects/lecoh.webp",
});

export default function LecohCoffeeshopLayout({ children }: { children: React.ReactNode }) {
    return children;
}
