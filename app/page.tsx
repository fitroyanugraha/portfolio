import "./styles/home.css";
import "./styles/preloader.css";

import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";

import PreloaderClient from "./(home)/PreloaderClient";
import HeroClient from "./(home)/HeroClient";
import WhatWeDoClient from "./(home)/WhatWeDoClient";
import FeaturedProjectsSection from "./(home)/FeaturedProjectsSection";
import GalleryCalloutSection from "./(home)/GalleryCalloutSection";

export const metadata: Metadata = generateMetadata({
  title: "Portfolio | Fitroya Nugraha",
  description:
    "Fitroya Nugraha portfolio — creative designer & web developer specializing in video editing, graphic design, and modern Next.js web experiences.",
  path: "/",
  image: "/home/piter.webp",
});

export default function Home() {
  return (
    <>
      <PreloaderClient />
      <Nav />
      <ErrorBoundary>
        <div data-route-root>
          <HeroClient />
          <WhatWeDoClient />
          <FeaturedProjectsSection />
          <GalleryCalloutSection />
        </div>
      </ErrorBoundary>
      <ConditionalFooter />
    </>
  );
}
