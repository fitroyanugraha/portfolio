"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import styles from './StoriesModal.module.css';
interface ModalItem {
  src: string;
  alt: string;
  type: 'image' | 'video' | 'pdf';
  thumbnail?: string;
}

interface StoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: ModalItem[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  videoRefs?: React.MutableRefObject<{ [key: number]: HTMLVideoElement | null }>;
}

const StoriesModal: React.FC<StoriesModalProps> = ({
  isOpen,
  onClose,
  items,
  currentIndex,
  onNext,
  onPrev,
  videoRefs
}) => {
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [pullOffset, setPullOffset] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchFeedback, setTouchFeedback] = useState<'left' | 'right' | null>(null);
  const [showFirstTimeHint, setShowFirstTimeHint] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    // Store original values including scroll position
    const originalBodyStyle = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      touchAction: document.body.style.touchAction,
      userSelect: document.body.style.userSelect,
      top: document.body.style.top,
      width: document.body.style.width
    };
    const originalScrollY = window.scrollY;

    // Disable body scroll and interactions
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${originalScrollY}px`;
    document.body.style.touchAction = 'none';
    document.body.style.userSelect = 'none';

    return () => {
      // Restore original styles or remove if they were empty
      if (originalBodyStyle.overflow) {
        document.body.style.overflow = originalBodyStyle.overflow;
      } else {
        document.body.style.removeProperty('overflow');
      }

      if (originalBodyStyle.position) {
        document.body.style.position = originalBodyStyle.position;
      } else {
        document.body.style.removeProperty('position');
      }

      if (originalBodyStyle.width) {
        document.body.style.width = originalBodyStyle.width;
      } else {
        document.body.style.removeProperty('width');
      }

      if (originalBodyStyle.top) {
        document.body.style.top = originalBodyStyle.top;
      } else {
        document.body.style.removeProperty('top');
      }

      if (originalBodyStyle.touchAction) {
        document.body.style.touchAction = originalBodyStyle.touchAction;
      } else {
        document.body.style.removeProperty('touch-action');
      }

      if (originalBodyStyle.userSelect) {
        document.body.style.userSelect = originalBodyStyle.userSelect;
      } else {
        document.body.style.removeProperty('user-select');
      }

      // Restore scroll position
      window.scrollTo(0, originalScrollY);
    };
  }, [isOpen]);


  // Auto-hide first time hint after 4 seconds
  useEffect(() => {
    if (showFirstTimeHint) {
      const hintTimer = setTimeout(() => {
        setShowFirstTimeHint(false);
      }, 4000);

      return () => clearTimeout(hintTimer);
    }
  }, [showFirstTimeHint]);

  // Handle navigation with transition
  const handleNavigation = useCallback((navigationFn: () => void) => {
    if (isTransitioning) return;

    // Pause current video if playing
    if (videoRefs?.current[currentIndex]) {
      const currentVideo = videoRefs.current[currentIndex];
      if (currentVideo && !currentVideo.paused) {
        currentVideo.pause();
      }
    }

    setIsTransitioning(true);

    setTimeout(() => {
      navigationFn();
      setIsTransitioning(false);
    }, 200);
  }, [currentIndex, videoRefs, isTransitioning]);

  // Enhanced touch handlers with pull-to-close and feedback
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
    setShowFirstTimeHint(false); // Hide hint after first interaction
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart || !touchStartY) return;

    const currentX = e.targetTouches[0].clientX;
    const currentY = e.targetTouches[0].clientY;
    const deltaY = currentY - touchStartY;

    // Pull-to-close: only allow downward pull from top half of screen
    if (touchStartY < window.innerHeight * 0.5 && deltaY > 0) {
      const pullDistance = Math.min(deltaY * 0.5, 150); // Max 150px pull
      setPullOffset(pullDistance);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart || !touchStartY) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchStart - touchEndX;
    const deltaY = touchEndY - touchStartY;
    const minSwipeDistance = 50;

    // Check for pull-to-close
    if (pullOffset > 100 && deltaY > 80) {
      onClose();
      return;
    }

    // Reset pull offset
    setPullOffset(0);

    // Handle horizontal swipe navigation
    if (Math.abs(deltaX) > minSwipeDistance && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0 && items.length > 1) {
        // Swipe left - next
        handleNavigation(onNext);
      } else if (deltaX < 0 && items.length > 1) {
        // Swipe right - previous  
        handleNavigation(onPrev);
      }
    }

    // Reset touch states
    setTouchStart(0);
    setTouchStartY(0);
  };

  // Tap handlers for left/right navigation zones with feedback
  const handleTapNavigation = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    if (items.length <= 1) return;

    setShowFirstTimeHint(false); // Hide hint after first interaction

    if (x < width * 0.3) {
      // Left third - previous
      setTouchFeedback('left');
      setTimeout(() => setTouchFeedback(null), 300);
      handleNavigation(onPrev);
    } else if (x > width * 0.7) {
      // Right third - next  
      setTouchFeedback('right');
      setTimeout(() => setTouchFeedback(null), 300);
      handleNavigation(onNext);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && items.length > 1) handleNavigation(onNext);
      if (e.key === 'ArrowLeft' && items.length > 1) handleNavigation(onPrev);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev, handleNavigation, items.length]);

  if (!isOpen || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];

  const renderContent = () => {
    if (currentItem.type === 'video') {
      return (
        <video
          key={`video-${currentIndex}-${currentItem.src}`}
          ref={(el) => {
            if (el && videoRefs) videoRefs.current[currentIndex] = el;
          }}
          src={currentItem.src}
          controls
          playsInline
          className={styles["stories-content-video"]}
        />
      );
    } else if (currentItem.type === 'pdf') {
      return (
        <div className={styles["stories-content-pdf"]}>
          <iframe
            src={currentItem.src}
            title={currentItem.alt}
            className={styles["stories-pdf-viewer"]}
          />
        </div>
      );
    } else {
      return (
        <Image
          key={`image-${currentIndex}-${currentItem.src}`}
          src={currentItem.src}
          alt={currentItem.alt || 'Story image'}
          className={styles["story-image"]}
          fill
          style={{ objectFit: 'contain' }}
          sizes="100vw"
        />
      );
    }
  };

  return (
    <div
      className={styles["stories-modal-overlay"]}
      role="dialog"
      aria-modal="true"
      aria-label={currentItem.alt}
      style={{
        transform: `translateY(${pullOffset}px)`,
        opacity: pullOffset > 0 ? Math.max(0.3, 1 - pullOffset / 300) : 1
      }}
    >
      {/* Progress indicators showing current position */}
      <div className={styles["stories-progress-container"]}>
        {items.map((_, index) => (
          <div
            key={index}
            className={`${styles["stories-progress-bar"]} ${index < currentIndex
              ? styles["completed"]
              : index === currentIndex
                ? styles["active"]
                : styles["pending"]
              }`}
          />
        ))}
      </div>

      {/* Close button */}
      <button
        className={styles["stories-close-btn"]}
        onClick={onClose}
        aria-label="Close stories"
      >
        <X size={24} />
      </button>

      {/* Main content area with tap zones */}
      <div
        className={styles["stories-content-container"]}
        onClick={handleTapNavigation}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Touch feedback indicators */}
        {touchFeedback && (
          <div
            className={`${styles["touch-feedback"]} ${touchFeedback === 'left'
              ? styles["touch-feedback-left"]
              : styles["touch-feedback-right"]
              }`}
          >
            {touchFeedback === 'left' ? '◀' : '▶'}
          </div>
        )}

        {renderContent()}

        {/* First time navigation hint */}
        {showFirstTimeHint && (
          <div className={styles["first-time-hint"]}>
            Tap sides or swipe to navigate
          </div>
        )}

        {/* Pull to close hint */}
        {pullOffset > 30 && (
          <div className={styles["pull-hint"]}>
            Pull down to close
          </div>
        )}
      </div>

    </div>
  );
};

export default StoriesModal;
