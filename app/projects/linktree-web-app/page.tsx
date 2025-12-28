"use client";
import "./linktree.css";
import "./linktree-sections.css";

import Image from "next/image";
import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import SplitTextAnimate from "@/components/SplitText/SplitText";
import AnimatedItem from "@/components/AnimateItem/AnimateItem";
import { Link2 } from "lucide-react";
import UserFlow from "./UserFlow";
import ProjectStructure from "./ProjectStructure";
import "./project-structure.css";
import {
  projectOverview,
  techStack,
  keyFeatures,
  securityFeatures,
  seoFeatures,
} from "./linktreeData";

export default function LinktreeWebAppPage() {
  return (
    <>
      <Nav />
      <div className="page project">
        {/* Hero Section */}
        <section className="project-hero">
          <AnimatedItem delay={0.5} animateOnScroll={false}>
            <div className="project-hero-img">
              <Image src="/projects/linktree-web-app.webp" alt="Personal Linktree" fill style={{ objectFit: 'cover' }} priority sizes="100vw" />
            </div>
          </AnimatedItem>
          <div className="project-hero-overlay"></div>
          <div className="container">
            <div className="project-hero-header">
              <SplitTextAnimate delay={1} animateOnScroll={false}>
                <h1>{projectOverview.title}</h1>
              </SplitTextAnimate>
            </div>
            <div className="project-content">
              <div className="project-col">
                <SplitTextAnimate delay={1.05} animateOnScroll={false}>
                  <p>{projectOverview.subtitle}</p>
                </SplitTextAnimate>
                <AnimatedItem delay={1.2} animateOnScroll={false}>
                  <div className="project-mobile-preview">
                    <Image src="/linktree/linktree.webp" alt="Linktree Mobile Preview" fill style={{ objectFit: 'contain' }} sizes="(max-width: 768px) 100vw, 300px" />
                  </div>
                </AnimatedItem>
              </div>
              <div className="project-col">
                <div className="project-content-wrapper">
                  <SplitTextAnimate delay={1.1} animateOnScroll={false}>
                    <div className="view-project-button">
                      <p
                        style={{ gap: "6px", cursor: "pointer" }}
                        onClick={() => {
                          window.open(projectOverview.liveDemo, "_blank");
                        }}
                      >
                        View Demo Project
                        <span style={{ justifySelf: "center", alignSelf: "center" }}>
                          <Link2 size={16} style={{ transform: "rotate(-45deg)" }} />
                        </span>
                      </p>
                      <span className="underline-dashed"></span>
                    </div>
                  </SplitTextAnimate>
                </div>
                <div className="project-content-wrapper">
                  <SplitTextAnimate delay={1.15} animateOnScroll={false}>
                    <h3>{projectOverview.description}</h3>
                  </SplitTextAnimate>
                </div>
                <div className="project-content-wrapper project-meta">
                  <div className="project-hero-row">
                    <div className="project-hero-sub-col">
                      <SplitTextAnimate delay={0.2}>
                        <p>Deployment</p>
                        <p>{projectOverview.deployment}</p>
                      </SplitTextAnimate>
                    </div>
                    <div className="project-hero-sub-col">
                      <SplitTextAnimate delay={0.2}>
                        <p>Project Type</p>
                      </SplitTextAnimate>
                      {projectOverview.projectType.map((type) => (
                        <SplitTextAnimate key={type} delay={0.2}>
                          <p>{type}</p>
                        </SplitTextAnimate>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="project-content-wrapper project-meta">
                  <div className="project-hero-row">
                    <div className="project-hero-sub-col">
                      <SplitTextAnimate delay={0.35}>
                        <p>Frontend Framework</p>
                        <p>React 19.1.1</p>
                        <p>Vite 7.1.7</p>
                      </SplitTextAnimate>
                    </div>
                    <div className="project-hero-sub-col">
                      <SplitTextAnimate delay={0.35}>
                        <p>Key Technologies</p>
                        <p>CSS3</p>
                        <p>SheetDB API</p>
                      </SplitTextAnimate>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="project-details project-details-1">
          <div className="container">
            <div className="project-col">
              <SplitTextAnimate delay={0.1}>
                <p>Project Overview</p>
              </SplitTextAnimate>
            </div>
            <div className="project-col">
              <SplitTextAnimate delay={0.1}>
                <h3>
                  A personal linktree web application that serves as a centralized hub for
                  social media profiles and contact. Built with modern React and Vite, it
                  features a clean, responsive design with smooth interactions.
                </h3>
                <h3>
                  The application includes an anonymous contact form with intelligent rate
                  limiting, social media deep linking for mobile apps, and comprehensive
                  security features including input sanitization and XSS protection.
                </h3>
              </SplitTextAnimate>
              <AnimatedItem delay={0.3}>
                <div className="project-details-img landscape">
                  <Image src="/projects/linktree-web-app.webp" alt="Linktree Interface" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              </AnimatedItem>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="project-details project-details-2">
          <div className="container">
            <div className="project-col">
              <SplitTextAnimate delay={0.1}>
                <p>Key Features</p>
              </SplitTextAnimate>
            </div>
            <div className="project-col">
              <div className="features-grid">
                {keyFeatures.map((feature, index) => (
                  <div key={feature.title} className="feature-card">
                    <SplitTextAnimate delay={0.1 + index * 0.05}>
                      <div className="feature-icon">{feature.icon}</div>
                      <h4>{feature.title}</h4>
                      <p>{feature.description}</p>
                    </SplitTextAnimate>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="project-details project-details-1">
          <div className="container">
            <div className="project-col">
              <SplitTextAnimate delay={0.1}>
                <p>Technology Stack</p>
              </SplitTextAnimate>
            </div>
            <div className="project-col">
              <div className="tech-stack-grid">
                {Object.entries(techStack).map(([category, items]) => (
                  <div key={category} className="tech-category">
                    <SplitTextAnimate delay={0.1}>
                      <h4>{category.replace(/([A-Z])/g, " $1").trim()}</h4>
                      <ul>
                        {items.map((item: any) => (
                          <li key={item.name}>
                            <span className="tech-name">{item.name}</span>
                            {item.version && (
                              <span className="tech-version">v{item.version}</span>
                            )}
                            {item.purpose && (
                              <span className="tech-purpose">{item.purpose}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </SplitTextAnimate>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* User Flow Section */}
        <section className="project-details project-details-2">
          <div className="container">
            <div className="project-col">
              <SplitTextAnimate delay={0.1}>
                <p>User Interaction Flow</p>
              </SplitTextAnimate>
            </div>
            <div className="project-col">
              <UserFlow />
            </div>
          </div>
        </section>

        {/* Project Structure Section */}
        <section className="project-details project-details-1">
          <div className="container">
            <div className="project-col">
              <SplitTextAnimate delay={0.1}>
                <p>Project Architecture</p>
              </SplitTextAnimate>
            </div>
            <div className="project-col">
              <SplitTextAnimate delay={0.1}>
                <h3>
                  The project follows a clean, modular architecture with separated concerns.
                  Components are organized by functionality, with dedicated data files for
                  configuration and reusable utilities.
                </h3>
              </SplitTextAnimate>
              <ProjectStructure />
            </div>
          </div>
        </section>

        {/* Security Features Section */}
        <section className="project-details project-details-2">
          <div className="container">
            <div className="project-col">
              <SplitTextAnimate delay={0.1}>
                <p>Security & Protection</p>
              </SplitTextAnimate>
            </div>
            <div className="project-col">
              <div className="security-grid">
                {securityFeatures.map((feature, index) => (
                  <div key={feature.category} className="security-card">
                    <SplitTextAnimate delay={0.1 + index * 0.05}>
                      <h4>{feature.category}</h4>
                      <ul>
                        {feature.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </SplitTextAnimate>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SEO Features Section */}
        <section className="project-details project-details-1">
          <div className="container">
            <div className="project-col">
              <SplitTextAnimate delay={0.1}>
                <p>SEO Optimization</p>
              </SplitTextAnimate>
            </div>
            <div className="project-col">
              <SplitTextAnimate delay={0.1}>
                <h3>
                  The application is fully optimized for search engines with comprehensive
                  meta tags, structured data, and semantic HTML. This ensures better
                  visibility and shareability across social platforms.
                </h3>
              </SplitTextAnimate>
              <div className="seo-features-list">
                {seoFeatures.map((feature, index) => (
                  <AnimatedItem key={feature} delay={0.2 + index * 0.05}>
                    <div className="seo-item">
                      <span className="seo-check">•</span>
                      <span>{feature}</span>
                    </div>
                  </AnimatedItem>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="project-details project-details-2 cta-section">
          <div className="container">
            <div className="project-col">
              <SplitTextAnimate delay={0.1}>
                <p>Ready to Explore?</p>
              </SplitTextAnimate>
            </div>
            <div className="project-col">
              <SplitTextAnimate delay={0.1}>
                <h3>
                  Check out the live application and explore the source code on GitHub.
                </h3>
              </SplitTextAnimate>
              <AnimatedItem delay={0.3}>
                <div className="cta-buttons">
                  <button
                    className="cta-btn cta-btn-primary"
                    onClick={() => {
                      window.open(projectOverview.liveDemo, "_blank");
                    }}
                  >
                    <span>View Live Demo</span>
                    <Link2 size={16} style={{ transform: "rotate(-45deg)" }} />
                  </button>
                  <button
                    className="cta-btn cta-btn-secondary"
                    onClick={() => {
                      window.open(projectOverview.github, "_blank");
                    }}
                  >
                    <span>GitHub Repository</span>
                    <Link2 size={16} style={{ transform: "rotate(-45deg)" }} />
                  </button>
                </div>
              </AnimatedItem>
            </div>
          </div>
        </section>
      </div>
      <ConditionalFooter />
    </>
  );
}
