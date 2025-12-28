"use client";
import "./Footer.css";

import { useRef } from "react";
import Image from "next/image";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useViewTransition } from "@/hooks/useViewTransition";
import SplitTextAnimate from "../SplitText/SplitText";
import { CONTACT_INFO } from "@/constants/contact-info";
import { NAV_LINKS } from "@/constants/nav-links";
import { RiGithubLine, RiLinkedinBoxLine, RiInstagramLine } from "react-icons/ri";

const Footer = () => {
  const { navigateWithTransition } = useViewTransition();
  const socialIconsRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useGSAP(
    () => {
      if (!socialIconsRef.current) return;

      const icons = socialIconsRef.current.querySelectorAll(".icon");
      gsap.set(icons, { opacity: 0, x: -40 });

      scrollTriggerRef.current?.kill();
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: socialIconsRef.current,
        start: "top 90%",
        once: true,
        animation: gsap.to(icons, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: -0.1,
          ease: "power3.out",
        }),
      });

      return () => {
        scrollTriggerRef.current?.kill();
        scrollTriggerRef.current = null;
      };
    },
    { scope: socialIconsRef }
  );

  return (
    <div className="footer">
      <div className="footer-meta">
        <div className="container footer-meta-header">
          <div className="footer-meta-col">
            <div className="footer-meta-block">
              <div className="footer-meta-logo">
              </div>
              <SplitTextAnimate delay={0.2}>
                <h2>Stories told through motion, design, and code.</h2>
              </SplitTextAnimate>
            </div>
          </div>
          <div className="footer-meta-col">
            <div className="footer-nav-links">
              <SplitTextAnimate delay={0.1}>
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateWithTransition(link.href);
                    }}
                  >
                    <h3>{link.label}</h3>
                  </a>
                ))}
              </SplitTextAnimate>
            </div>
          </div>
        </div>
        <div className="container footer-socials">
          <div className="footer-meta-col">
            <div className="footer-socials-wrapper" ref={socialIconsRef}>
              <a
                href={CONTACT_INFO.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="icon"
                aria-label="Visit my LinkedIn profile"
              >
                <RiLinkedinBoxLine aria-hidden="true" />
              </a>
              <a
                href={CONTACT_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="icon"
                aria-label="Visit my Instagram profile"
              >
                <RiInstagramLine aria-hidden="true" />
              </a>
              <a
                href={CONTACT_INFO.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="icon"
                aria-label="Visit my GitHub profile"
              >
                <RiGithubLine aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="footer-meta-col">
            <SplitTextAnimate delay={0.1}>
              <p>
                I believe great work speaks through emotion, clarity, and
                seamless execution
              </p>
            </SplitTextAnimate>
          </div>
        </div>
      </div>
      <div className="footer-outro">
        <div className="container">
          <div className="footer-header">
            <Image src="/assets/footer.svg" alt="Check Icon" width={100} height={100} />
          </div>
          <div className="footer-copyright">
            <p>
              Developed by — <span>{CONTACT_INFO.name.full}</span>
            </p>
            <p>This website is using cookies.</p>
            <p>All rights reserved &copy; 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
