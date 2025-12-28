import Image from "next/image";
import SplitTextAnimate from "@/components/SplitText/SplitText";
import AnimatedButton from "@/components/AnimatedButton/AnimatedButton";

const GALLERY_IMAGES = [
    {
        src: "/projects/kriplix.webp",
        alt: "Kriplix YouTube Channel Design Project",
        className: "gallery-callout-img-1",
    },
    {
        src: "/projects/linktree-web-app.webp",
        alt: "Linktree Web Application Project",
        className: "gallery-callout-img-2",
    },
    {
        src: "/projects/lecoh.webp",
        alt: "Le.Coh Coffeeshop Branding Project",
        className: "gallery-callout-img-3",
    },
    {
        src: "/projects/order-system.webp",
        alt: "Scan to Order System Project",
        className: "gallery-callout-img-4",
    },
];

export default function GalleryCalloutSection() {
    const imageRows = [GALLERY_IMAGES.slice(0, 2), GALLERY_IMAGES.slice(2, 4)];

    return (
        <section className="gallery-callout">
            <div className="container">
                <div className="gallery-callout-col">
                    {imageRows.map((row, rowIndex) => (
                        <div key={rowIndex} className="gallery-callout-row">
                            {row.map((image) => (
                                <div
                                    key={image.src}
                                    className={`gallery-callout-img ${image.className}`}
                                >
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        loading="lazy"
                                        style={{ objectFit: "cover" }}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="gallery-callout-col">
                    <div className="gallery-callout-copy">
                        <SplitTextAnimate delay={0.1}>
                            <h3>
                                Dive into the creative work that defines my craft. From
                                cinematic edits to stunning visuals and seamless web experiences,
                                each project tells a story that might spark your next vision.
                            </h3>
                        </SplitTextAnimate>
                        <AnimatedButton
                            label="Explore Projects"
                            route="/projects"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
