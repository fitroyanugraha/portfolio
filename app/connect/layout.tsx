import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
    title: "Connect | Fitroya Nugraha",
    description: "Contact Fitroya Nugraha for commissions in video editing, graphic design, and Next.js web development.",
    path: "/connect",
    image: "/projects/linktree-web-app.webp",
});

export default function ConnectLayout({ children }: { children: React.ReactNode }) {
    return children;
}
