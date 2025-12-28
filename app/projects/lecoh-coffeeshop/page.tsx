"use client";
import "./lecoh-coffee.css";

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
import { Instagram, Coffee, Palette, Image as ImageIcon, Play, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { galleryItems, colorPalette, highlights, tags, processSteps, type GalleryItem } from "./lecohData";
import useModal from "@/hooks/useModal";
import useVideoManager from "@/hooks/useVideoManager";

export default function LeCohCoffeeshopPage() {
  const lightSectionRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'stories' | 'reels' | 'menu'>('all');
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  const { videoRefs, pauseAll, cleanup: cleanupVideos } = useVideoManager();

  // Cache strategy: render all items once, show/hide with CSS
  const allItems = galleryItems;

  // Helper function to check if item should be visible
  const isItemVisible = useCallback((item: GalleryItem) => {
    return activeTab === 'all' || item.category === activeTab;
  }, [activeTab]);

  // Category counts (memoized once)
  const categoryCounts = useMemo(() => ({
    all: galleryItems.length,
    stories: galleryItems.filter(item => item.category === 'stories').length,
    reels: galleryItems.filter(item => item.category === 'reels').length,
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
  const handleTabChange = useCallback((tab: 'all' | 'stories' | 'reels' | 'menu') => {
    if (tab === activeTab) return;
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
      const label = section.querySelector('.lecoh-section-label');
      const title = section.querySelector('.lecoh-section-title');
      const desc = section.querySelector('.lecoh-section-desc');

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

      const tabs = tabsRef.current.querySelectorAll('.lecoh-tab');

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
        <div className="lecoh-page">
          {/* Hero Section */}
          <section className="lecoh-hero">
            <div className="lecoh-hero-bg">
              <Image
                src="/lecoh/hero.webp"
                alt="Le.Coh Coffeeshop"
                fill
                priority
                loading="eager"
                fetchPriority="high"
                sizes="100vw"
                style={{ objectFit: 'cover' }}
                blurDataURL="data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoKAAgAAUAmJaQAA3AA/vuUAAA="
              />
            </div>
            <div className="lecoh-hero-overlay"></div>
            <div className="lecoh-hero-content">
              <SplitTextAnimate delay={1} animateOnScroll={false}>
                <h1>Le.Coh Coffeeshop</h1>
              </SplitTextAnimate>
              <SplitTextAnimate delay={1.1} animateOnScroll={false}>
                <p>A cozy neighborhood café where great coffee and warm hospitality create the perfect gathering space. Helping bring my friend's vision to life through thoughtful design and authentic storytelling.</p>
              </SplitTextAnimate>
              <div onClick={() => window.open("https://www.instagram.com/lecoh.coffee", "_blank")}>
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
          <section className="lecoh-section" style={{ paddingTop: '6rem' }}>
            <div className="lecoh-container">
              <div className="lecoh-section-header">
                <SplitTextAnimate delay={0.05}>
                  <p className="lecoh-section-label">Growing Together</p>
                  <h2 className="lecoh-section-title">Building & Managing Le.Coh</h2>
                  <p className="lecoh-section-desc">
                    I'm not just designing for Le.Coh, I'm actively developing and managing the business alongside my friend.
                    From creating a strong visual identity through video content and social media design, to managing operations
                    and strategy, I'm invested in every aspect of the café's growth. Together, we're building a thriving community
                    space that reflects our shared vision and values.
                  </p>
                </SplitTextAnimate>
              </div>

              {/* Highlights */}
              <div className="lecoh-highlights">
                {highlights.map((highlight, index) => {
                  const IconComponent = highlight.icon === 'Coffee' ? Coffee : highlight.icon === 'Palette' ? Palette : ImageIcon;
                  return (
                    <SplitTextAnimate key={index} delay={0.1 + (index * 0.05)}>
                      <div className="lecoh-highlight-item">
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

          {/* Logo & Brand Section */}
          <section className="lecoh-section">
            <div className="lecoh-container">
              <div className="lecoh-logo-section">
                <div className="lecoh-logo-content">
                  <SplitTextAnimate delay={0.1}>
                    <p className="lecoh-section-label">Brand Identity</p>
                    <h2 className="lecoh-section-title">Visual Signature</h2>
                  </SplitTextAnimate>
                  <SplitTextAnimate delay={0.15}>
                    <h3>
                      The original logo lacked proper design principles, making it difficult for customers to recognize the brand.
                      I worked with my friend to redesign it with clear visual guidelines and marketing strategy in mind, creating
                      a distinctive, memorable mark that would help people instantly recognize Le.Coh and build brand awareness.
                    </h3>
                    <h3>
                      The redesigned logo successfully increased brand recognition in the community. In 2025, my friend decided to
                      update the logo again to reflect the café's new direction. While I'm no longer actively involved with Le.Coh,
                      this project remains a meaningful example of how strategic design and collaboration can significantly impact
                      a small business's growth and brand presence.
                    </h3>
                  </SplitTextAnimate>
                </div>
                <div className="lecoh-logo-container">
                  <Image
                    src="/lecoh/logo.webp"
                    alt="Le.Coh Coffeeshop Logo"
                    width={800}
                    height={800}
                    loading="lazy"
                    style={{ width: "100%", height: "auto", objectFit: "contain" }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Color Palette Section */}
          <section className="lecoh-section">
            <div className="lecoh-container">
              <div className="lecoh-section-header">
                <SplitTextAnimate delay={0.1}>
                  <p className="lecoh-section-label">Brand Colors</p>
                  <h2 className="lecoh-section-title">Color Identity</h2>
                  <p className="lecoh-section-desc">
                    A warm and inviting palette inspired by coffee, natural wood, and the cozy café atmosphere.
                    These colors work together to create a visual identity that feels both welcoming and authentic.
                  </p>
                </SplitTextAnimate>
              </div>

              {/* Color Palette */}
              <ColorPalette colors={colorPalette} animationDelay={0.15} />
            </div>
          </section>

          {/* Gallery Section with Tabs */}
          <section className="lecoh-section lecoh-light-section" ref={lightSectionRef}>
            <div className="lecoh-container">
              <div className="lecoh-section-header">
                <SplitTextAnimate delay={0.1}>
                  <p className="lecoh-section-label">Visual Portfolio</p>
                  <h2 className="lecoh-section-title">Content Showcase</h2>
                  <p className="lecoh-section-desc">
                    Explore Le.Coh's visual identity through social media content and video reels that showcase
                    the café's personality and aesthetic.
                  </p>
                </SplitTextAnimate>
              </div>

              {/* Tabs */}
              <div className="lecoh-tabs" ref={tabsRef}>
                <button
                  className={`lecoh-tab ${activeTab === 'all' ? 'active' : ''}`}
                  onClick={() => handleTabChange('all')}
                  aria-label={`View All Items (${categoryCounts.all} items)`}
                  aria-pressed={activeTab === 'all'}
                >
                  <ImageIcon size={18} />
                  <span>All</span>
                  <span className="lecoh-tab-count">({categoryCounts.all})</span>
                </button>
                <button
                  className={`lecoh-tab ${activeTab === 'stories' ? 'active' : ''}`}
                  onClick={() => handleTabChange('stories')}
                  aria-label={`View Instagram Stories (${categoryCounts.stories} items)`}
                  aria-pressed={activeTab === 'stories'}
                >
                  <Instagram size={18} />
                  <span>Instagram Stories</span>
                  <span className="lecoh-tab-count">({categoryCounts.stories})</span>
                </button>
                <button
                  className={`lecoh-tab ${activeTab === 'reels' ? 'active' : ''}`}
                  onClick={() => handleTabChange('reels')}
                  aria-label={`View Reels (${categoryCounts.reels} items)`}
                  aria-pressed={activeTab === 'reels'}
                >
                  <Play size={18} />
                  <span>Reels</span>
                  <span className="lecoh-tab-count">({categoryCounts.reels})</span>
                </button>
                <button
                  className={`lecoh-tab ${activeTab === 'menu' ? 'active' : ''}`}
                  onClick={() => handleTabChange('menu')}
                  aria-label={`View Menu (${categoryCounts.menu} items)`}
                  aria-pressed={activeTab === 'menu'}
                >
                  <BookOpen size={18} />
                  <span>Menu</span>
                  <span className="lecoh-tab-count">({categoryCounts.menu})</span>
                </button>
              </div>

              {/* Gallery Grid */}
              <div
                className="lecoh-gallery"
                ref={galleryRef}
              >
                {allItems.map((item, index) => (
                  <AnimatedItem key={`${activeTab}-${item.src}`} delay={isFirstLoad ? 0.6 : 0.3} scrollStart="top 110%">
                    <div
                      className={`lecoh-gallery-item ${isItemVisible(item) ? 'visible' : 'hidden'}`}
                      data-category={item.category}
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
                        <div className="lecoh-gallery-video-thumb">
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
          <section className="lecoh-section">
            <div className="lecoh-container">
              <ProcessSteps
                steps={processSteps}
                label="Creative Process"
                title="From Concept to Brand"
                delay={0.1}
              />

              <FinalImpact
                label="The Impact"
                title="Building Community Through Design"
                description={
                  <>
                    Through strategic visual identity and engaging content, Le.Coh built a strong presence in the local community.
                    The thoughtful design and authentic storytelling strengthened customer connection and helped the café stand out.
                    This project demonstrates how good design, when done with genuine care, can help a small business grow and
                    create lasting relationships with its customers.
                  </>
                }
                tags={tags}
                imageSrc="/projects/lecoh.webp"
                imageAlt="Le.Coh Coffeeshop"
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
