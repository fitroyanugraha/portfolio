import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import StoriesModal from './components/StoriesModal';
import { ModalItem } from './types';
import styles from './ModalPreview.module.css';

export type { ModalItem };

type ModalPreviewProps = {
  isOpen: boolean;
  onClose: () => void;
  items: ModalItem[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  videoRefs?: React.MutableRefObject<{ [key: string]: HTMLVideoElement | null }>;
};

const ModalPreview: React.FC<ModalPreviewProps> = ({
  isOpen,
  onClose,
  items,
  currentIndex,
  onNext,
  onPrev,
  videoRefs
}) => {
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showCounter, setShowCounter] = useState<boolean>(false);
  const counterTimeoutRef = useRef<number | null>(null);

  // Detect if device is mobile/tablet (non-desktop)
  useEffect(() => {
    const checkDevice = () => {
      const isMobileDevice = window.innerWidth <= 1000;
      const hasTouchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      setIsMobile(isMobileDevice);
      setIsTouchDevice(hasTouchSupport);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Handle navigation with proper video management (for keyboard/button navigation)
  const handleNavigation = useCallback((navigationFn: () => void) => {
    // Pause current video if it's playing
    if (videoRefs?.current[currentIndex]) {
      const currentVideo = videoRefs.current[currentIndex];
      if (currentVideo && !currentVideo.paused) {
        currentVideo.pause();
      }
    }

    // Execute navigation
    navigationFn();
  }, [currentIndex, videoRefs]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNavigation(onNext);
      if (e.key === 'ArrowLeft') handleNavigation(onPrev);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev, handleNavigation]);

  // Handle video state when currentIndex changes
  useEffect(() => {
    if (!isOpen || !videoRefs?.current) return;

    // Pause all videos except the current one and clean up refs
    Object.entries(videoRefs.current).forEach(([index, video]) => {
      const indexNum = parseInt(index);
      if (video && indexNum !== currentIndex) {
        video.pause();
        video.currentTime = 0; // Reset to beginning
        // Remove old video refs to prevent memory leaks
        delete videoRefs.current[indexNum];
      }
    });
  }, [currentIndex, isOpen, videoRefs]);

  useEffect(() => {
    if (!isOpen || items.length <= 1) {
      setShowCounter(false);
      if (counterTimeoutRef.current !== null) {
        window.clearTimeout(counterTimeoutRef.current);
        counterTimeoutRef.current = null;
      }
      return;
    }

    setShowCounter(true);

    if (counterTimeoutRef.current !== null) {
      window.clearTimeout(counterTimeoutRef.current);
    }

    counterTimeoutRef.current = window.setTimeout(() => {
      setShowCounter(false);
      counterTimeoutRef.current = null;
    }, 1000);

    return () => {
      if (counterTimeoutRef.current !== null) {
        window.clearTimeout(counterTimeoutRef.current);
        counterTimeoutRef.current = null;
      }
    };
  }, [currentIndex, isOpen, items.length]);


  // Prevent body scroll and interactions when modal is open (Desktop only)
  useEffect(() => {
    if (isOpen && !isMobile) {
      // Store original values
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      const originalBodyPosition = document.body.style.position;
      const originalBodyWidth = document.body.style.width;
      const originalBodyTop = document.body.style.top;
      const originalScrollY = window.scrollY;

      // Disable scroll and interactions
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${originalScrollY}px`;
      document.documentElement.style.overflow = 'hidden';

      return () => {
        // Restore original values
        document.body.style.overflow = originalBodyOverflow;
        document.body.style.position = originalBodyPosition;
        document.body.style.width = originalBodyWidth;
        document.body.style.top = originalBodyTop;
        document.documentElement.style.overflow = originalHtmlOverflow;

        // Restore scroll position
        window.scrollTo(0, originalScrollY);
      };
    }
  }, [isOpen, isMobile]);

  if (!isOpen || !items[currentIndex]) return null;

  // Use StoriesModal for mobile/tablet devices
  if (isMobile) {
    return (
      <StoriesModal
        isOpen={isOpen}
        onClose={onClose}
        items={items}
        currentIndex={currentIndex}
        onNext={onNext}
        onPrev={onPrev}
        videoRefs={videoRefs}
      />
    );
  }

  // Desktop modal continues below
  const currentItem = items[currentIndex];

  // Get adjacent items for preview during swipe
  const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
  const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
  const prevItem = items[prevIndex];
  const nextItem = items[nextIndex];

  // Render content for any item (reusable for current, prev, next)
  const renderItemContent = (item: ModalItem, index: number, isActive: boolean = false) => {
    if (item.type === 'video') {
      return (
        <video
          key={`video-${index}-${item.src}`}
          ref={isActive ? (el) => {
            if (el && videoRefs) videoRefs.current[index] = el;
          } : undefined}
          src={item.src}
          controls={isActive} // Only show controls on active video
          playsInline
          className={styles["modal-preview-video"]}
          style={{ pointerEvents: isActive ? 'auto' : 'none' }}
        />
      );
    } else if (item.type === 'pdf') {
      return (
        <div
          className={styles["modal-preview-pdf"]}
          key={`pdf-${index}-${item.src}`}
        >
          <iframe
            src={item.src}
            title={item.alt}
            className={styles["modal-preview-pdf-viewer"]}
            style={{ pointerEvents: isActive ? 'auto' : 'none' }}
          />
        </div>
      );
    } else {
      return (
        <Image
          key={`image-${index}-${item.src}`}
          src={item.src}
          alt={item.alt || 'Gallery image'}
          className={styles["modal-preview-image"]}
          fill
          style={{ objectFit: 'contain', pointerEvents: isActive ? 'auto' : 'none' }}
          sizes="100vw"
        />
      );
    }
  };

  return (
    <div
      className={styles["modal-preview-overlay"]}
      role="dialog"
      aria-modal="true"
      aria-label={currentItem.alt}
    /* Modal can only be closed via X button or ESC key, not by clicking overlay */
    >
      <button
        className={styles["modal-preview-close"]}
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close modal"
      >
        <X size={32} />
      </button>

      {items.length > 1 && !isTouchDevice && (
        <>
          <button
            className={styles["modal-preview-prev"]}
            onClick={(e) => { e.stopPropagation(); handleNavigation(onPrev); }}
            aria-label="Previous item"
          >
            <ChevronLeft size={32} />
          </button>

          <button
            className={styles["modal-preview-next"]}
            onClick={(e) => { e.stopPropagation(); handleNavigation(onNext); }}
            aria-label="Next item"
          >
            <ChevronRight size={32} />
          </button>
        </>
      )}

      {/* Single item display for desktop */}
      <div
        className={styles["modal-preview-content"]}
        onClick={(e) => e.stopPropagation()}
      >
        {renderItemContent(currentItem, currentIndex, true)}
      </div>

      {items.length > 1 && (
        <>
          <div
            className={`${styles["modal-preview-counter"]} ${showCounter ? styles["counter-visible"] : styles["counter-hidden"]
              }`}
          >
            {currentIndex + 1} / {items.length}
            {isTouchDevice && (
              <span className={styles["swipe-hint"]}>Swipe to navigate</span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ModalPreview;
