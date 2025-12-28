import Image from "next/image";
import SplitTextAnimate from "@/components/SplitText/SplitText";
import AnimatedItem from "@/components/AnimateItem/AnimateItem";

export default function HeroSection() {
    return (
        <section className="about-hero">
            <div className="container">
                <div className="about-hero-col">
                    <SplitTextAnimate delay={0.85}>
                        <p>
                            Visual storytelling meets digital craftsmanship. From video
                            narratives to graphic design and web experiences—built with
                            precision and creativity.
                        </p>
                    </SplitTextAnimate>
                </div>
                <div className="about-hero-col">
                    <SplitTextAnimate delay={0.85}>
                        <h2>
                            Bringing stories to life through video editing, capturing
                            attention with graphic design, and creating seamless web
                            experiences. Where creativity meets technology.
                        </h2>
                    </SplitTextAnimate>
                    <div className="about-hero-hero-img">
                        <AnimatedItem delay={0.3} scrollStart="top 100%">
                            <Image
                                src="/about/about.webp"
                                alt="Portrait of Fitroya Nugraha"
                                width={1024}
                                height={682}
                            />
                        </AnimatedItem>
                    </div>
                </div>
            </div>
        </section>
    );
}
