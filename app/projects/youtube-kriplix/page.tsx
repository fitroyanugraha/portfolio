"use client";
import "./kriplix.css";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import SplitTextAnimate from "@/components/SplitText/SplitText";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import AnimatedButton from "@/components/AnimatedButton/AnimatedButton";
import ColorPalette from "@/components/ColorPalette/ColorPalette";
import AnimatedItem from "@/components/AnimateItem/AnimateItem";
import ProcessSteps from "@/components/ProcessSteps/ProcessSteps";
import FinalImpact from "@/components/FinalImpact/FinalImpact";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { ModalItem } from "@/components/ModalPreview/ModalPreview";

const ModalPreview = dynamic(() => import("@/components/ModalPreview/ModalPreview"), {
  ssr: false,
});
import { Link2, Play, Video, Image as ImageIcon, Sparkles, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { colorPalette, thumbnails, highlights, processSteps, tags } from "./kriplixData";
import useModal from "@/hooks/useModal";
import { useVideoIntersection } from "@/hooks/useVideoIntersection";

export default function YouTubeKriplixPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lightSectionRef = useRef<HTMLElement>(null);
  const [showOverlay, setShowOverlay] = useState(true);
  const { isOpen, currentIndex, openModal, closeModal, next, prev } = useModal(thumbnails.length);
  const { registerVideo } = useVideoIntersection({ rootMargin: '300px' });

  const handlePlay = () => {
    if (videoRef.current) {
      // Reset to start if at thumbnail position
      if (videoRef.current.currentTime === 1) {
        videoRef.current.currentTime = 0;
      }
      videoRef.current.play();
      setShowOverlay(false);

      // Add playing class to video container
      const videoContainer = videoRef.current.closest('.kriplix-video');
      if (videoContainer) {
        videoContainer.classList.add('video-playing');

        // Dispatch custom event to notify cursor
        window.dispatchEvent(new CustomEvent('videoStateChange', {
          detail: { playing: true }
        }));
      }
    }
  };

  const handleVideoEnd = () => {
    if (videoRef.current) {
      // Reset to thumbnail position
      videoRef.current.currentTime = 1;
      setShowOverlay(true);

      // Remove playing class
      const videoContainer = videoRef.current.closest('.kriplix-video');
      if (videoContainer) {
        videoContainer.classList.remove('video-playing');

        // Dispatch custom event to notify cursor
        window.dispatchEvent(new CustomEvent('videoStateChange', {
          detail: { playing: false }
        }));
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const innerGlow = target.querySelector('.tag-inner-glow') as HTMLElement;
    if (innerGlow) {
      innerGlow.style.setProperty('--mouse-x', `${x}%`);
      innerGlow.style.setProperty('--mouse-y', `${y}%`);
    }
  };

  // Animate light section background color on scroll
  useGSAP(
    () => {
      if (!lightSectionRef.current) return;

      const section = lightSectionRef.current;
      const label = section.querySelector('.kriplix-section-label');
      const title = section.querySelector('.kriplix-section-title');
      const desc = section.querySelector('.kriplix-section-desc');

      gsap.to(section, {
        backgroundColor: "rgb(241, 241, 241)",
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate text colors
      if (label) {
        gsap.to(label, {
          color: "rgb(90, 89, 89)", // var(--base-400)
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });
      }

      if (title) {
        gsap.to(title, {
          color: "rgb(20, 19, 19)", // var(--base-500)
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });
      }

      if (desc) {
        gsap.to(desc, {
          color: "rgb(90, 89, 89)", // var(--base-400)
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });
      }
    },
    { scope: lightSectionRef }
  );

  return (
    <>
      <Nav />
      <ErrorBoundary>
        <div className="kriplix-page">
          {/* Hero Section */}
          <section className="kriplix-hero">
            <div className="kriplix-hero-bg">
              <Image
                src="/kriplix-youtube/hero.webp"
                alt="Kriplix Channel Banner"
                fill
                priority
                loading="eager"
                fetchPriority="high"
                sizes="100vw"
                style={{ objectFit: 'cover' }}
                blurDataURL="data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoKAAgAAUAmJaQAA3AA/vuUAAA="
              />
            </div>
            <div className="kriplix-hero-overlay"></div>
            <div className="kriplix-hero-content">
              <SplitTextAnimate delay={1.1} animateOnScroll={false}>
                <p>Bringing movie stories to life through engaging narrative recaps</p>
              </SplitTextAnimate>
              <div onClick={() => window.open("https://www.youtube.com/@kriplixmovie", "_blank")}>
                <AnimatedButton
                  label="Visit Youtube Channel"
                  animate={true}
                  animateOnScroll={false}
                  delay={1.2}
                />
              </div>
            </div>
          </section>

          {/* Project Overview */}
          <section className="kriplix-section" style={{ paddingTop: '6rem' }}>
            <div className="kriplix-container">
              <div className="kriplix-section-header">
                <SplitTextAnimate delay={0.05}>
                  <p className="kriplix-section-label">Movie Recap Youtube Channel</p>
                  <h2 className="kriplix-section-title">Kriplix</h2>
                  <p className="kriplix-section-desc">
                    A Youtube channel dedicated to summarizing and retelling movie storylines with
                    unique narrative style. Every video brings cinema to viewers who want to understand
                    complete plots without watching the full movie.
                  </p>
                </SplitTextAnimate>
              </div>

              {/* Channel Highlights */}
              <div className="kriplix-highlights">
                {highlights.map((highlight, index) => {
                  const IconComponent = highlight.icon === 'Video' ? Video : highlight.icon === 'ImageIcon' ? ImageIcon : Sparkles;
                  return (
                    <SplitTextAnimate key={index} delay={0.1 + (index * 0.05)}>
                      <div className="kriplix-highlight-item">
                        <IconComponent size={32} />
                        <h3>{highlight.title}</h3>
                        <p>{highlight.description}</p>
                      </div>
                    </SplitTextAnimate>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Channel Identity Section */}
          <section className="kriplix-section">
            <div className="kriplix-container">
              <div className="kriplix-grid-2">
                <div className="kriplix-content">
                  <SplitTextAnimate delay={0.1}>
                    <p className="kriplix-section-label">Channel Identity</p>
                    <h2 className="kriplix-section-title">A Playful Brand Story</h2>
                  </SplitTextAnimate>
                  <SplitTextAnimate delay={0.15}>
                    <h3>
                      The name "Kriplix" cleverly blends "kripik" (Indonesian for chips) with "Netflix", a
                      playful wordplay that captures the channel's essence: delivering bite-sized movie
                      content that's just as addictive as your favorite snack.
                    </h3>
                    <h3>
                      The logo design draws inspiration from Netflix's iconic bold aesthetic, reimagined
                      with a distinctive twist. Creating a unique visual identity that bridges cinematic
                      entertainment with snackable content perfectly representing how Kriplix serves
                      movies in convenient, digestible portions.
                    </h3>
                  </SplitTextAnimate>
                </div>
                <div className="kriplix-media kriplix-logo-container">
                  <Image
                    src="/kriplix-youtube/logo.webp"
                    alt="Kriplix Channel Logo"
                    width={800}
                    height={800}
                    loading="lazy"
                    style={{ width: "100%", height: "auto", objectFit: "contain" }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Intro Video Section */}
          <section className="kriplix-section">
            <div className="kriplix-container">
              <div className="kriplix-section-header">
                <SplitTextAnimate delay={0.1}>
                  <p className="kriplix-section-label">Channel Intro</p>
                  <h2 className="kriplix-section-title">Netflix-Inspired Motion</h2>
                  <p className="kriplix-section-desc">
                    Inspired by the iconic Netflix intro, this motion graphic features a bold,
                    animated letter "K" that represents Kriplix. The cinematic animation captures
                    the same dramatic energy and professionalism, instantly setting the tone for
                    quality movie recaps and establishing brand recognition with every video.
                  </p>
                </SplitTextAnimate>
              </div>
              <div className="kriplix-video" onClick={handlePlay}>
                <video
                  ref={(el) => {
                    if (el) {
                      videoRef.current = el;
                      registerVideo('intro-video', el);
                    }
                  }}
                  preload="none"
                  playsInline
                  data-src="/kriplix-youtube/video/intro.mp4#t=1"
                  onLoadedMetadata={(e) => {
                    const video = e.currentTarget;
                    video.currentTime = 1;
                  }}
                  onEnded={handleVideoEnd}
                >
                  <source data-src="/kriplix-youtube/video/intro.mp4#t=1" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {showOverlay && (
                  <div className="video-overlay">
                    <div className="mobile-play-button">
                      <Play size={32} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Color Palette Section */}
          <section className="kriplix-section">
            <div className="kriplix-container">
              <div className="kriplix-section-header">
                <SplitTextAnimate delay={0.1}>
                  <p className="kriplix-section-label">Brand Colors</p>
                  <h2 className="kriplix-section-title">Visual Identity Palette</h2>
                  <p className="kriplix-section-desc">
                    A carefully curated color palette that captures the cinematic essence of movie recaps,
                    combining bold energy with professional elegance to create instant brand recognition.
                  </p>
                </SplitTextAnimate>
              </div>

              {/* Color Palette */}
              <ColorPalette colors={colorPalette} animationDelay={0.15} />
            </div>
          </section>

          {/* Thumbnail Showcase Section */}
          <section className="kriplix-section kriplix-light-section" ref={lightSectionRef}>
            <div className="kriplix-container">
              <div className="kriplix-section-header">
                <SplitTextAnimate delay={0.1}>
                  <p className="kriplix-section-label">Thumbnail Strategy</p>
                  <h2 className="kriplix-section-title">Stopping the Scroll</h2>
                  <p className="kriplix-section-desc">
                    In the world of movie recaps, thumbnails are everything. Each design combines
                    dramatic movie scenes with intriguing titles that spark curiosity, crafted to
                    make viewers pause, click, and discover the story within.
                  </p>
                </SplitTextAnimate>
              </div>

              {/* Thumbnail Grid */}
              <div className="kriplix-grid-4">
                {thumbnails.map((thumbnail, index) => (
                  <AnimatedItem key={index} delay={0.15 + (index * 0.05)}>
                    <div
                      className="kriplix-thumbnail-item"
                      onClick={() => openModal(index)}
                      role="button"
                      tabIndex={0}
                      aria-label={`View ${thumbnail.alt}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          openModal(index);
                        }
                      }}
                    >
                      <Image
                        src={thumbnail.src}
                        alt={thumbnail.alt}
                        width={800}
                        height={800}
                        loading="lazy"
                        style={{ width: "100%", height: "auto", objectFit: "cover" }}
                      />
                    </div>
                  </AnimatedItem>
                ))}
              </div>
            </div>
          </section>

          {/* Creative Process & Impact Section */}
          <section className="kriplix-section">
            <div className="kriplix-container">
              <ProcessSteps
                steps={processSteps}
                label="Content Creation"
                title="From Movie to Recap"
                delay={0.1}
                className="kriplix-section-header"
              />

              <FinalImpact
                label="Channel Impact"
                title="Cinema in Digestible Portions"
                description="Kriplix transforms full-length movies into bite-sized narratives that viewers can enjoy in minutes. By combining compelling storytelling with strategic visual design and carefully crafted thumbnails, the channel delivers engaging recaps that capture attention and leave viewers wanting more. Through consistent branding and authentic storytelling, Kriplix serves cinema as digestible portions, making quality content accessible to everyone."
                tags={tags}
                imageSrc="/projects/kriplix.webp"
                imageAlt="Kriplix Channel"
                onMouseMove={handleMouseMove}
                delay={0.35}
              />
            </div>
          </section>
        </div>

        {/* Modal Preview */}
        <ModalPreview
          isOpen={isOpen}
          onClose={closeModal}
          items={thumbnails.map(thumb => ({ ...thumb, type: 'image' as const })) as ModalItem[]}
          currentIndex={currentIndex}
          onNext={next}
          onPrev={prev}
        />
      </ErrorBoundary>

      <ConditionalFooter />
    </>
  );
}
