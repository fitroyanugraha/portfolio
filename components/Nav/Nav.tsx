"use client";
import styles from "./Nav.module.css";

import {
  useEffect,
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
} from "react";
import Link from "next/link";

import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useLenis } from "lenis/react";

import MenuBtn from "../MenuBtn/MenuBtn";
import Toast from "../Toast/Toast";
import { useViewTransition } from "@/hooks/useViewTransition";
import { CONTACT_INFO } from "@/constants/contact-info";
import { NAV_LINKS } from "@/constants/nav-links";


const Nav = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [showMenuBtn, setShowMenuBtn] = useState(false);
  const [isEmailCopied, setIsEmailCopied] = useState(false);
  const [isComingSoonActive, setIsComingSoonActive] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isInitializedRef = useRef(false);
  const splitTextRefs = useRef<SplitText[]>([]);
  const footerRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lenis = useLenis();

  const { navigateWithTransition } = useViewTransition();

  useEffect(() => {
    const syncComingSoon = () => {
      const active = typeof document !== "undefined" && document.body.dataset.comingSoon === "true";
      setIsComingSoonActive(active);
    };

    syncComingSoon();
    window.addEventListener("coming-soon:change", syncComingSoon);
    return () => window.removeEventListener("coming-soon:change", syncComingSoon);
  }, []);

  const handleCopyEmail = useCallback(async () => {
    const email = CONTACT_INFO.email.commissions;

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = email;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setIsEmailCopied(true);
      window.setTimeout(() => setIsEmailCopied(false), 1500);
    } catch {
      setIsEmailCopied(false);
    }
  }, []);

  useEffect(() => {
    if (!isComingSoonActive) return;
    setShowMenuBtn(false);
    if (isOpen) setIsOpen(false);
  }, [isComingSoonActive, isOpen]);

  const updateOnScroll = useCallback(() => {
    if (typeof document !== "undefined" && document.body.dataset.comingSoon === "true") {
      setShowMenuBtn(false);
      return;
    }

    const scrollPosition = window.scrollY;
    const heroHeight = window.innerHeight; // 100vh

    // Always show MenuBtn on specific pages
    const pathname = window.location.pathname;
    const alwaysShowMenuBtn = pathname === "/gallery" || pathname === "/connect";
    if (alwaysShowMenuBtn) {
      setShowMenuBtn(true);
      return;
    }

    // Cache footer element on first call
    if (!footerRef.current) {
      footerRef.current = document.querySelector('.footer');
    }

    // Check if footer is in view
    if (footerRef.current) {
      const footerRect = footerRef.current.getBoundingClientRect();
      const footerInView = footerRect.top <= window.innerHeight;

      // Show button after hero section, but hide when footer is in view
      if (scrollPosition > heroHeight * 0.8 && !footerInView) {
        setShowMenuBtn(true);
      } else {
        setShowMenuBtn(false);
      }
    } else {
      // Fallback if footer not found
      if (scrollPosition > heroHeight * 0.8) {
        setShowMenuBtn(true);
      } else {
        setShowMenuBtn(false);
      }
    }
  }, []);

  useEffect(() => {
    if (lenis) {
      if (isOpen) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  }, [lenis, isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      // Cancel previous frame
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      // Use requestAnimationFrame for smooth, instant updates
      rafRef.current = requestAnimationFrame(() => {
        updateOnScroll();
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateOnScroll(); // Check initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateOnScroll]);

  // GSAP plugins now registered via lib/animations.ts

  useLayoutEffect(() => {
    if (menuRef.current) {
      const menu = menuRef.current;

      splitTextRefs.current.forEach((split) => {
        if (split.revert) split.revert();
      });
      splitTextRefs.current = [];

      gsap.set(menu, {
        clipPath: "circle(0% at 50% 50%)",
      });

      const h2Elements = menu.querySelectorAll("h2");
      const pElements = menu.querySelectorAll("p");
      const aElements = menu.querySelectorAll(".menu-meta a, .menu-meta button");

      h2Elements.forEach((h2, index) => {
        const split = SplitText.create(h2, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });

        gsap.set(split.lines, { y: "120%" });

        (split.lines as HTMLElement[]).forEach((line: HTMLElement) => {
          line.style.pointerEvents = "auto";
        });

        splitTextRefs.current.push(split);
      });

      pElements.forEach((p, index) => {
        const split = SplitText.create(p, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });

        gsap.set(split.lines, { y: "120%" });

        (split.lines as HTMLElement[]).forEach((line: HTMLElement) => {
          line.style.pointerEvents = "auto";
        });

        splitTextRefs.current.push(split);
      });

      // Animate social links (anchor tags)
      aElements.forEach((a, index) => {
        const split = SplitText.create(a, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });

        gsap.set(split.lines, { y: "120%" });

        (split.lines as HTMLElement[]).forEach((line: HTMLElement) => {
          line.style.pointerEvents = "auto";
        });

        splitTextRefs.current.push(split);
      });

      isInitializedRef.current = true;
    }
  }, []);

  const animateMenu = useCallback((open: boolean) => {
    if (!menuRef.current) {
      return;
    }

    const menu = menuRef.current;

    setIsAnimating(true);

    if (open) {
      document.body.classList.add("menu-open");

      gsap.to(menu, {
        clipPath: "circle(100% at 50% 50%)",
        ease: "power3.out",
        duration: 2,
        onStart: () => {
          menu.style.pointerEvents = "all";

          // Animate text lines
          splitTextRefs.current.forEach((split, index) => {
            gsap.to(split.lines, {
              y: "0%",
              stagger: 0.05,
              delay: 0.35 + index * 0.1,
              duration: 1,
              ease: "power4.out",
            });
          });
        },
        onComplete: () => {
          setIsAnimating(false);
        },
      });
    } else {
      const textTimeline = gsap.timeline({
        onStart: () => {
          gsap.to(menu, {
            clipPath: "circle(0% at 50% 50%)",
            ease: "power3.out",
            duration: 1,
            delay: 0.75,
            onComplete: () => {
              menu.style.pointerEvents = "none";

              splitTextRefs.current.forEach((split) => {
                gsap.set(split.lines, { y: "120%" });
              });

              document.body.classList.remove("menu-open");

              setIsAnimating(false);
              setIsNavigating(false);
            },
          });
        },
      });

      splitTextRefs.current.forEach((split, index) => {
        textTimeline.to(
          split.lines,
          {
            y: "-120%",
            stagger: 0.03,
            delay: index * 0.05,
            duration: 1,
            ease: "power3.out",
          },
          0
        );
      });
    }
  }, []);

  useEffect(() => {
    if (isInitializedRef.current) {
      animateMenu(isOpen);
    }
  }, [isOpen, animateMenu]);

  const toggleMenu = useCallback(() => {
    if (!isAnimating && isInitializedRef.current && !isNavigating) {
      setIsOpen((prevIsOpen) => !prevIsOpen);
    }
  }, [isAnimating, isNavigating]);

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();

      const anchorEl = e.currentTarget;

      const currentPath = window.location.pathname;
      if (currentPath === href) {
        if (isOpen) {
          setIsOpen(false);
        }
        return;
      }

      if (isNavigating) return;

      setIsNavigating(true);

      window.setTimeout(() => {
        anchorEl.dataset.pressed = "false";
        navigateWithTransition(href);
      }, 60);
    },
    [isNavigating, isOpen, navigateWithTransition]
  );

  const handleLinkPressStart = useCallback((e: React.PointerEvent<HTMLAnchorElement>) => {
    e.currentTarget.dataset.pressed = "true";
  }, []);

  const handleLinkPressEnd = useCallback((e: React.PointerEvent<HTMLAnchorElement>) => {
    e.currentTarget.dataset.pressed = "false";
  }, []);

  return (
    <div>
      <MenuBtn isOpen={isOpen} toggleMenu={toggleMenu} show={showMenuBtn} />
      <div className={`${styles.menu} menu`} ref={menuRef}>
        <div className={styles["menu-wrapper"]}>
          <div className={`${styles.col} ${styles["col-1"]}`}>
            <div className="links">
              {NAV_LINKS.map((link) => (
                <div className={styles.link} key={link.href}>
                  <Link
                    href={link.href}
                    onPointerDown={handleLinkPressStart}
                    onPointerUp={handleLinkPressEnd}
                    onPointerCancel={handleLinkPressEnd}
                    onPointerLeave={handleLinkPressEnd}
                    onClick={(e) => handleLinkClick(e, link.href)}
                  >
                    <h2>{link.label}</h2>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className={`${styles.col} ${styles["col-2"]}`}>
            <div className={styles.socials}>
              <div className={styles["sub-col"]}>
                <div className={`${styles["menu-meta"]} menu-meta menu-commissions`}>
                  <p>E-mail</p>
                  <button
                    type="button"
                    className={styles.copyEmail}
                    onClick={handleCopyEmail}
                    aria-label={`Copy email ${CONTACT_INFO.email.commissions}`}
                    title={isEmailCopied ? "Copied" : "Click to copy"}
                  >
                    {CONTACT_INFO.email.commissions}
                  </button>
                </div>
                <div className={`${styles["menu-meta"]} menu-meta`}>
                  <p>Based in</p>
                  <p>{CONTACT_INFO.address.country}</p>
                </div>
              </div>
              <div className={styles["sub-col"]}>
                <div className={`${styles["menu-meta"]} menu-meta`}>
                  <p>Social</p>
                  <a
                    href={CONTACT_INFO.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Instagram profile"
                    onPointerDown={handleLinkPressStart}
                    onPointerUp={handleLinkPressEnd}
                    onPointerCancel={handleLinkPressEnd}
                    onPointerLeave={handleLinkPressEnd}
                  >
                    Instagram
                  </a>
                  <a
                    href={CONTACT_INFO.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit LinkedIn profile"
                    onPointerDown={handleLinkPressStart}
                    onPointerUp={handleLinkPressEnd}
                    onPointerCancel={handleLinkPressEnd}
                    onPointerLeave={handleLinkPressEnd}
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toast open={isEmailCopied} message="Copied" onClose={() => setIsEmailCopied(false)} />
    </div>
  );
};

export default Nav;
