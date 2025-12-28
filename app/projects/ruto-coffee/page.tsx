"use client";
import "./ruto-coffee.css";

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
import { Instagram, Coffee, Palette, Image as ImageIcon, FileText, Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { galleryItems, colorPalette, highlights, tags, processSteps, type GalleryItem } from "./rutoData";
import useModal from "@/hooks/useModal";
import useVideoManager from "@/hooks/useVideoManager";

export default function RutoCoffeePage() {
  const lightSectionRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'stories' | 'posters' | 'menu'>('all');
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  const { videoRefs, pauseAll, cleanup: cleanupVideos } = useVideoManager();

  // Cache strategy: render all items once, show/hide with CSS
  const allItems = galleryItems; // Always render all items

  // Helper function to check if item should be visible
  const isItemVisible = useCallback((item: GalleryItem) => {
    return activeTab === 'all' || item.category === activeTab;
  }, [activeTab]);

  // Category counts (memoized once)
  const categoryCounts = useMemo(() => ({
    all: galleryItems.length,
    stories: galleryItems.filter(item => item.category === 'stories').length,
    posters: galleryItems.filter(item => item.category === 'posters').length,
    menu: galleryItems.filter(item => item.category === 'menu').length,
  }), []);

  // Get currently visible items for modal navigation
  const visibleItems = useMemo(
    () => allItems.filter(item => isItemVisible(item)),
    [isItemVisible]
  );

  // Centralized modal state using useModal, based on visible items count
  const {
    isOpen,
    currentIndex,
    openModal,
    closeModal: baseCloseModal,
    next,
    prev,
    setIndex,
  } = useModal(visibleItems.length);

  const closeModal = useCallback(() => {
    baseCloseModal();
    pauseAll();
  }, [baseCloseModal, pauseAll]);


  // Simple tab change with 'All' option
  const handleTabChange = useCallback((tab: 'all' | 'stories' | 'posters' | 'menu') => {
    if (tab === activeTab) return; // Prevent unnecessary re-renders
    setIsFirstLoad(false);
    setActiveTab(tab);
    setIndex(0);
  }, [activeTab, setIndex]);

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
      const label = section.querySelector('.ruto-section-label');
      const title = section.querySelector('.ruto-section-title');
      const desc = section.querySelector('.ruto-section-desc');

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

      if (label) {
        gsap.to(label, {
          color: "rgb(90, 89, 89)",
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
          color: "rgb(20, 19, 19)",
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
          color: "rgb(90, 89, 89)",
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

  // Animate tabs on scroll
  useGSAP(
    () => {
      if (!tabsRef.current) return;

      const tabs = tabsRef.current.querySelectorAll('.ruto-tab');

      gsap.fromTo(
        tabs,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: tabsRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: tabsRef }
  );




  // Cleanup videos on unmount
  useEffect(() => {
    return () => {
      cleanupVideos();
    };
  }, [cleanupVideos]);

  return (
    <>
      <Nav />
      <ErrorBoundary>
        <div className="ruto-page">
          {/* Hero Section */}
          <section className="ruto-hero">
            <div className="ruto-hero-bg">
              <Image
                src="/ruto-coffee/hero.webp"
                alt="Ruto Coffee"
                fill
                priority
                loading="eager"
                fetchPriority="high"
                sizes="100vw"
                style={{ objectFit: 'cover' }}
                blurDataURL="data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoKAAgAAUAmJaQAA3AA/vuUAAA="
              />
            </div>
            <div className="ruto-hero-overlay"></div>
            <div className="ruto-hero-content">
              <SplitTextAnimate delay={1} animateOnScroll={false}>
                <h1>Ruto Coffee</h1>
              </SplitTextAnimate>
              <SplitTextAnimate delay={1.1} animateOnScroll={false}>
                <p>A Japanese-inspired coffee shop where tradition meets modern café culture, crafting unique experiences through carefully designed visual identity and authentic ambiance.</p>
              </SplitTextAnimate>
              <div onClick={() => window.open("https://www.instagram.com/rutocoffee.co", "_blank")}>
                <AnimatedButton
                  label="Visit Instagram"
                  animate={true}
                  animateOnScroll={false}
                  delay={1.2}
                />
              </div>
            </div>
          </section>

          {/* Project Overview */}
          <section className="ruto-section" style={{ paddingTop: '6rem' }}>
            <div className="ruto-container">
              <div className="ruto-section-header">
                <SplitTextAnimate delay={0.05}>
                  <p className="ruto-section-label">Barista & Marketing</p>
                  <h2 className="ruto-section-title">Building Brand While Serving Coffee</h2>
                  <p className="ruto-section-desc">
                    While working as a barista at Ruto Coffee, I also developed the café's visual identity and marketing strategy.
                    My work included social media content creation, menu design, and brand guidelines that blend Japanese minimalist
                    design with contemporary coffee culture. I managed the café's social presence and helped establish a strong brand
                    identity that resonated with customers. By late 2025, I transitioned out of this role, but the foundation I helped
                    build continues to define Ruto Coffee's identity.
                  </p>
                </SplitTextAnimate>
              </div>

              {/* Highlights */}
              <div className="ruto-highlights">
                {highlights.map((highlight, index) => {
                  const IconComponent = highlight.icon === 'Coffee' ? Coffee : highlight.icon === 'Palette' ? Palette : ImageIcon;
                  return (
                    <SplitTextAnimate key={index} delay={0.1 + (index * 0.05)}>
                      <div className="ruto-highlight-item">
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

          {/* Color Palette Section */}
          <section className="ruto-section">
            <div className="ruto-container">
              <div className="ruto-section-header">
                <SplitTextAnimate delay={0.1}>
                  <p className="ruto-section-label">Brand Colors</p>
                  <h2 className="ruto-section-title">Color Identity</h2>
                  <p className="ruto-section-desc">
                    A carefully curated palette inspired by Japanese aesthetics and coffee culture,
                    balancing earthy warmth with modern sophistication to create a memorable visual presence.
                  </p>
                </SplitTextAnimate>
              </div>

              {/* Color Palette */}
              <ColorPalette colors={colorPalette} animationDelay={0.15} />
            </div>
          </section>

          {/* Gallery Section with Tabs */}
          <section className="ruto-section ruto-light-section" ref={lightSectionRef}>
            <div className="ruto-container">
              <div className="ruto-section-header">
                <SplitTextAnimate delay={0.1}>
                  <p className="ruto-section-label">Visual Portfolio</p>
                  <h2 className="ruto-section-title">Design Showcase</h2>
                  <p className="ruto-section-desc">
                    Explore the visual language of Ruto Coffee through social media content,
                    promotional posters, and menu designs that define the café's identity.
                  </p>
                </SplitTextAnimate>
              </div>

              {/* Tabs */}
              <div className="ruto-tabs" ref={tabsRef}>
                <button
                  className={`ruto-tab ${activeTab === 'all' ? 'active' : ''}`}
                  onClick={() => handleTabChange('all')}
                  aria-label={`View All Items (${categoryCounts.all} items)`}
                  aria-pressed={activeTab === 'all'}
                >
                  <ImageIcon size={18} />
                  <span>All</span>
                  <span className="ruto-tab-count">({categoryCounts.all})</span>
                </button>
                <button
                  className={`ruto-tab ${activeTab === 'stories' ? 'active' : ''}`}
                  onClick={() => handleTabChange('stories')}
                  aria-label={`View Instagram Stories (${categoryCounts.stories} items)`}
                  aria-pressed={activeTab === 'stories'}
                >
                  <Instagram size={18} />
                  <span>Instagram Stories</span>
                  <span className="ruto-tab-count">({categoryCounts.stories})</span>
                </button>
                <button
                  className={`ruto-tab ${activeTab === 'posters' ? 'active' : ''}`}
                  onClick={() => handleTabChange('posters')}
                  aria-label={`View Posters (${categoryCounts.posters} items)`}
                  aria-pressed={activeTab === 'posters'}
                >
                  <ImageIcon size={18} />
                  <span>Posters</span>
                  <span className="ruto-tab-count">({categoryCounts.posters})</span>
                </button>
                <button
                  className={`ruto-tab ${activeTab === 'menu' ? 'active' : ''}`}
                  onClick={() => handleTabChange('menu')}
                  aria-label={`View Menu Books (${categoryCounts.menu} items)`}
                  aria-pressed={activeTab === 'menu'}
                >
                  <FileText size={18} />
                  <span>Menu Books</span>
                  <span className="ruto-tab-count">({categoryCounts.menu})</span>
                </button>
              </div>

              {/* Gallery Grid */}
              <div
                className="ruto-gallery"
                ref={galleryRef}
              >
                {allItems.map((item, index) => (
                  <AnimatedItem key={`${activeTab}-${item.src}`} delay={isFirstLoad ? 0.6 : 0.3} scrollStart="top 110%">
                    <div
                      className={`ruto-gallery-item ${isItemVisible(item) ? 'visible' : 'hidden'}`}
                      onClick={() => openModal(visibleItems.findIndex(visibleItem => visibleItem.src === item.src))}
                      role="button"
                      tabIndex={0}
                      aria-label={`View ${item.alt}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          openModal(visibleItems.findIndex(visibleItem => visibleItem.src === item.src));
                        }
                      }}
                    >
                      {item.type === 'video' ? (
                        <div className="ruto-gallery-video-thumb">
                          <video
                            preload="metadata"
                            playsInline
                          >
                            <source src={`${item.src}#t=1`} type="video/mp4" />
                          </video>
                          <div className="video-play-icon">
                            <Play size={32} />
                          </div>
                        </div>
                      ) : item.type === 'pdf' ? (
                        <div className="ruto-gallery-pdf-thumb">
                          <Image
                            src={item.thumbnail || item.src}
                            alt={item.alt}
                            width={600}
                            height={800}
                            loading="lazy"
                            style={{ width: "100%", height: "auto", objectFit: "cover" }}
                          />
                          <div className="pdf-icon">
                            <FileText size={32} />
                          </div>
                        </div>
                      ) : (
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width={600}
                          height={800}
                          loading="lazy"
                          style={{ width: "100%", height: "auto", objectFit: "cover" }}
                        />
                      )}
                    </div>
                  </AnimatedItem>

                ))}
              </div>
            </div>
          </section>

          {/* Creative Process & Impact Section */}
          <section className="ruto-section">
            <div className="ruto-container">
              <ProcessSteps
                steps={processSteps}
                label="Design Process"
                title="From Concept to Brand"
                delay={0.1}
              />

              <FinalImpact
                label="Measurable Impact"
                title="Design That Drives Results"
                description={
                  <>
                    My comprehensive visual identity and content strategy delivered significant business
                    results for Ruto Coffee. The cohesive brand design and engaging social media content
                    increased revenue by <strong>42%</strong> while growing Instagram engagement <strong>27%</strong> and expanding the follower base substantially. This demonstrates
                    how strategic design directly impacts customer acquisition, retention, and business growth.
                  </>
                }
                tags={tags}
                imageSrc="/projects/ruto.webp"
                imageAlt="Ruto Coffee"
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
          items={visibleItems as ModalItem[]}
          currentIndex={currentIndex}
          onNext={next}
          onPrev={prev}
          videoRefs={videoRefs}
        />
      </ErrorBoundary>

      <ConditionalFooter />
    </>
  );
}
