import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
    title: "Kriplix | YouTube Branding & Editing | Fitroya Nugraha",
    description: "Kriplix case study: YouTube branding, cinematic video editing, graphics, and storytelling-driven content.",
    path: "/projects/youtube-kriplix",
    image: "/projects/kriplix.webp",
});

export default function YoutubeKriplixLayout({ children }: { children: React.ReactNode }) {
    return children;
}
