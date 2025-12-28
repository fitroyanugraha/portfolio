import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
    title: "Scan To Order | QR Ordering System | Fitroya Nugraha",
    description: "Scan To Order project: a fullstack QR ordering system concept built with Next.js, TypeScript, and real-time updates.",
    path: "/projects/scan-to-order",
    image: "/projects/order-system.webp",
});

export default function ScanToOrderLayout({ children }: { children: React.ReactNode }) {
    return children;
}
