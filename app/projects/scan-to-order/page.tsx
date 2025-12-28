"use client";
import "./project.css";

import Image from "next/image";
import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import SplitTextAnimate from "@/components/SplitText/SplitText";
import ComingSoonPage from "@/components/ComingSoonModal/ComingSoonModal";


const IS_PROJECT_READY = false;

export default function ScanToOrderPage() {
  if (!IS_PROJECT_READY) {
    return (
      <>
        <Nav />
        <ComingSoonPage
          projectName="Scan To Order"
          projectType="Fullstack QR Ordering System"
        />
      </>
    );
  }

  return (
    <>
      <Nav />
      <div className="page project">
        <section className="project-hero">
          <div className="project-hero-img">
            <Image src="/projects/order-system.webp" alt="Scan To Order" fill style={{ objectFit: 'cover' }} priority sizes="100vw" />
          </div>
          <div className="project-hero-overlay"></div>
          <div className="container">
            <div className="project-hero-header">
              <SplitTextAnimate delay={1} animateOnScroll={false}>
                <h1>Scan To Order</h1>
              </SplitTextAnimate>
            </div>
            <div className="project-content">
              <div className="project-col">
                <SplitTextAnimate delay={1.05} animateOnScroll={false}>
                  <p>Fullstack Scan to Order App</p>
                </SplitTextAnimate>
              </div>
              <div className="project-col">
                <div className="project-content-wrapper">
                  <SplitTextAnimate delay={1.15} animateOnScroll={false}>
                    <h3>
                      Scan To Order is a comprehensive fullstack application that streamlines
                      the ordering process through QR code technology, combining frontend
                      elegance with robust backend functionality.
                    </h3>
                    <h3>
                      The system integrates modern web technologies with practical business
                      logic, creating a seamless ordering experience from menu browsing to
                      order completion.
                    </h3>
                  </SplitTextAnimate>
                </div>
                <div className="project-content-wrapper project-meta">
                  <div className="project-hero-row">
                    <div className="project-hero-sub-col">
                      <SplitTextAnimate delay={0.2}>
                        <p>Date Completed</p>
                        <p>March 2021</p>
                      </SplitTextAnimate>
                    </div>
                    <div className="project-hero-sub-col">
                      <SplitTextAnimate delay={0.2}>
                        <p>Project Type</p>
                        <p>Fullstack Web App</p>
                        <p>QR Ordering System</p>
                      </SplitTextAnimate>
                    </div>
                  </div>
                </div>
                <div className="project-content-wrapper project-meta">
                  <div className="project-hero-row">
                    <div className="project-hero-sub-col">
                      <SplitTextAnimate delay={0.35}>
                        <p>Tech Stack</p>
                        <p>React / Next.js</p>
                        <p>Node.js</p>
                      </SplitTextAnimate>
                    </div>
                    <div className="project-hero-sub-col">
                      <SplitTextAnimate delay={0.35}>
                        <p>Features</p>
                        <p>QR Code Scanning</p>
                        <p>Order Management</p>
                      </SplitTextAnimate>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section >
        <section className="project-details project-details-1">
          <div className="container">
            <div className="project-col">
              <SplitTextAnimate delay={0.1}>
                <p>Development Journey</p>
              </SplitTextAnimate>
            </div>
            <div className="project-col">
              <SplitTextAnimate delay={0.1}>
                <h3>
                  Building Scan To Order involved creating both customer-facing and admin
                  interfaces. The system handles everything from menu display to order
                  tracking with real-time updates and intuitive controls.
                </h3>

                <h3>
                  The architecture emphasizes reliability and speed: efficient database queries,
                  optimized frontend rendering, and secure authentication. These foundations
                  ensure smooth operations during peak hours.
                </h3>
              </SplitTextAnimate>
              <div className="project-details-img">
                <Image src="/projects/order-system.webp" alt="Order System Interface" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
            </div>
          </div>
        </section>
        <section className="project-details project-details-2">
          <div className="container">
            <div className="project-col">
              <SplitTextAnimate delay={0.1}>
                <p>System Architecture</p>
              </SplitTextAnimate>
            </div>
            <div className="project-col">
              <div className="project-content-wrapper project-meta">
                <div className="project-hero-row">
                  <div className="project-hero-sub-col">
                    <SplitTextAnimate delay={0.1}>
                      <p>Frontend</p>
                      <p>React / Next.js</p>
                      <p>Responsive UI</p>
                    </SplitTextAnimate>
                  </div>
                  <div className="project-hero-sub-col">
                    <SplitTextAnimate delay={0.1}>
                      <p>Backend</p>
                      <p>Node.js</p>
                      <p>Database</p>
                    </SplitTextAnimate>
                  </div>
                </div>
              </div>
              <div className="project-content-wrapper project-meta">
                <div className="project-hero-row">
                  <div className="project-hero-sub-col">
                    <SplitTextAnimate delay={0.2}>
                      <p>Core Features</p>
                      <p>QR Menu Access</p>
                      <p>Real-time Orders</p>
                      <p>Admin Dashboard</p>
                    </SplitTextAnimate>
                  </div>
                  <div className="project-hero-sub-col">
                    <SplitTextAnimate delay={0.2}>
                      <p>Project Type</p>
                      <p>Personal Project</p>
                    </SplitTextAnimate>
                  </div>
                </div>
              </div>
              <div className="project-details-img">
                <Image
                  src="/projects/order-system.webp"
                  alt="Scan to order system"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <SplitTextAnimate delay={0.2}>
                <h3>
                  Every feature serves operational efficiency. The goal is to create an
                  ordering system that reduces friction for customers while providing
                  restaurant staff with powerful management tools.
                </h3>
              </SplitTextAnimate>
            </div>
          </div>
        </section>
      </div >
      <ConditionalFooter />
    </>
  );
}
