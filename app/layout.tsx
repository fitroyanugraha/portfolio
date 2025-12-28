import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientLayout from "@/components/layouts/ClientLayout";
import TopBar from "@/components/TopBar/TopBar";
import { defaultMetadata } from "@/lib/metadata";
import StructuredData, {
  personSchema,
  websiteSchema,
  portfolioSchema,
} from "@/components/StructuredData/StructuredData";
import { Manrope, DM_Mono } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
  style: ["normal", "italic"],
  preload: true,
  fallback: ["monospace"],
});

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#141313",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${dmMono.variable}`}>
      <head>
        <StructuredData data={personSchema} />
        <StructuredData data={websiteSchema} />
        <StructuredData data={portfolioSchema} />
      </head>
      <body className={manrope.className}>
        <ClientLayout>
          <TopBar />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
