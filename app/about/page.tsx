import "./about.css";

import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";

import HeroSection from "./components/HeroSection";
import SkillsSection from "./components/SkillsSection";
import HowWeWorkSection from "./components/HowWeWorkSection";

export const metadata: Metadata = generateMetadata({
  title: "About | Fitroya Nugraha",
  description:
    "About Fitroya Nugraha — creative designer & web developer. Explore skills, workflow, and the creative process behind each project.",
  path: "/about",
  image: "/about/about.webp",
});

export default function AboutPage() {
  return (
    <>
      <Nav />
      <ErrorBoundary>
        <div className="page about" data-route-root>
          <HeroSection />
          <SkillsSection />
          <HowWeWorkSection />
        </div>
      </ErrorBoundary>
      <ConditionalFooter />
    </>
  );
}
