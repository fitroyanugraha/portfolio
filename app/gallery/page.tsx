import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import Nav from "@/components/Nav/Nav";
import ComingSoonPage from "@/components/ComingSoonModal/ComingSoonModal";
import Gallery from "@/components/Gallery/Gallery";
import SectionErrorBoundary from "@/components/ErrorBoundary/SectionErrorBoundary";

const IS_GALLERY_READY = false;

export const metadata: Metadata = generateMetadata({
  title: "Gallery | Fitroya Nugraha",
  description:
    "Selected work by Fitroya Nugraha — a curated gallery of video edits, graphic design, and modern web projects.",
  path: "/gallery",
  image: "/projects/lecoh.webp",
});

export default function GalleryPage() {
  if (!IS_GALLERY_READY) {
    return (
      <>
        <Nav />
        <ComingSoonPage projectName="Gallery" projectType="Showcasing photos and videos" />
      </>
    );
  }

  return (
    <>
      <Nav />
      <div className="page gallery">
        <SectionErrorBoundary>
          <Gallery />
        </SectionErrorBoundary>
      </div>
    </>
  );
}
