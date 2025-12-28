import React, { useEffect, useRef, useState } from "react";
import "./Cursor.css";
import gsap from "gsap";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Play } from "lucide-react";
import { usePathname } from "next/navigation";

const Cursor = React.memo(() => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [isVideoHover, setIsVideoHover] = useState(false);
  const isVideoHoverRef = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // Reset cursor state on route change so hover styles don't leak between pages
  useEffect(() => {
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const icon = iconRef.current;

    isVideoHoverRef.current = false;
    setIsVideoHover(false);

    if (cursor && icon) {
      gsap.killTweensOf([cursor, icon]);
      gsap.set(icon, { scale: 0 });
      gsap.set(cursor, { scale: 0.1 });
    }
  }, [pathname, isTouchDevice]);

  useEffect(() => {
    // Don't initialize cursor on touch devices
    if (isTouchDevice) return;
    const cursor = cursorRef.current;
    const icon = iconRef.current;

    if (!cursor || !icon) return;

    gsap.set(cursor, {
      scale: 0.1,
    });

    gsap.set(icon, {
      scale: 0,
    });

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    // Listen for video state changes
    const handleVideoStateChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const isPlaying = customEvent.detail.playing;

      const videoElements = document.querySelectorAll('.kriplix-video');

      videoElements.forEach((video) => {
        // Check if mouse is over video element
        if (video.matches(':hover')) {
          if (isPlaying) {
            // Video started playing - hide custom cursor immediately
            isVideoHoverRef.current = false;
            setIsVideoHover(false);
            gsap.to(icon, {
              scale: 0,
              duration: 0.3,
              ease: "power2.out",
            });
            gsap.to(cursor, {
              scale: 0.1,
              duration: 0.3,
              ease: "power2.out",
            });
          } else {
            // Video ended - show play cursor again
            isVideoHoverRef.current = true;
            setIsVideoHover(true);
            gsap.to(cursor, {
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
            });
            gsap.to(icon, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        }
      });
    };

    // Store event handlers with proper references
    const eventHandlers = new Map<Element, { enter: () => void; leave: () => void }>();

    const attachProjectListeners = () => {
      const projects = document.querySelectorAll(".featured-project-card-img");

      projects.forEach((project) => {
        // Skip if already has listeners
        if (eventHandlers.has(project)) return;

        const handleMouseEnter = () => {
          isVideoHoverRef.current = false;
          setIsVideoHover(false);
          gsap.to(cursor, {
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
            onStart: () => {
              gsap.to(icon, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
              });
            },
          });
        };

        const handleMouseLeave = () => {
          gsap.to(icon, {
            scale: 0,
            duration: 0.3,
            ease: "power2.out",
            onStart: () => {
              gsap.to(cursor, {
                scale: 0.1,
                duration: 0.5,
                ease: "power2.out",
              });
            },
          });
        };

        eventHandlers.set(project, { enter: handleMouseEnter, leave: handleMouseLeave });
        project.addEventListener("mouseenter", handleMouseEnter);
        project.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    const attachVideoListeners = () => {
      const videos = document.querySelectorAll(".kriplix-video");

      videos.forEach((video) => {
        // Skip if already has listeners
        if (eventHandlers.has(video)) return;

        const handleMouseEnter = () => {
          // Simple logic: Check if video is currently playing
          const isPlaying = video.classList.contains('video-playing');

          if (!isPlaying) {
            // Show play cursor only if video is NOT playing
            isVideoHoverRef.current = true;
            setIsVideoHover(true);
            gsap.to(cursor, {
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
              onStart: () => {
                gsap.to(icon, {
                  scale: 1,
                  duration: 0.3,
                  ease: "power2.out",
                });
              },
            });
          } else {
            // Video is playing: keep cursor hidden (don't show custom cursor)
            isVideoHoverRef.current = false;
            setIsVideoHover(false);
          }
        };

        const handleMouseLeave = () => {
          // Always reset cursor when leaving video area - same as featured work
          isVideoHoverRef.current = false;
          setIsVideoHover(false);

          gsap.to(icon, {
            scale: 0,
            duration: 0.3,
            ease: "power2.out",
            onStart: () => {
              gsap.to(cursor, {
                scale: 0.1,
                duration: 0.5,
                ease: "power2.out",
              });
            },
          });
        };

        eventHandlers.set(video, { enter: handleMouseEnter, leave: handleMouseLeave });
        video.addEventListener("mouseenter", handleMouseEnter);
        video.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    // Initial attachment
    attachProjectListeners();
    attachVideoListeners();

    // Watch for new elements being added to the DOM
    const observer = new MutationObserver(() => {
      attachProjectListeners();
      attachVideoListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("videoStateChange", handleVideoStateChange);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("videoStateChange", handleVideoStateChange);
      observer.disconnect();
      eventHandlers.forEach((handlers, project) => {
        project.removeEventListener("mouseenter", handlers.enter);
        project.removeEventListener("mouseleave", handlers.leave);
      });
      eventHandlers.clear();
    };
  }, [isTouchDevice]);

  // Don't render custom cursor on touch devices
  if (isTouchDevice) {
    return null;
  }

  return (
    <div className={`cursor ${isVideoHover ? 'cursor-video' : ''}`} ref={cursorRef}>
      <div className="cursor-icon" ref={iconRef}>
        {isVideoHover ? <Play size={28} /> : <MdOutlineArrowOutward size={28} />}
      </div>
    </div>
  );
});

Cursor.displayName = 'Cursor';

export default Cursor;
