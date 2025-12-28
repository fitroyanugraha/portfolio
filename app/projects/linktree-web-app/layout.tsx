import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
    title: "Linktree Web App | React & Vite | Fitroya Nugraha",
    description: "Linktree Web App case study: a custom link-in-bio app with deep linking, anonymous messaging, and a fast responsive UI.",
    path: "/projects/linktree-web-app",
    image: "/projects/linktree-web-app.webp",
});

export default function LinktreeWebAppLayout({ children }: { children: React.ReactNode }) {
    return children;
}
