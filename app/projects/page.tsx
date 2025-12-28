"use client";
import "./projects.css";
import { projectsData, type ProjectData } from "./projectsData";
import {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
  type MouseEvent,
  type ReactElement,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import SplitTextAnimate from "@/components/SplitText/SplitText";
import { useViewTransition } from "@/hooks/useViewTransition";
import { Briefcase, Code, Palette, Video, User, Coffee, Link as LinkIcon, ShoppingCart, Users, Search } from "lucide-react";

const ALL_FILTER = "All";
const CLIENT_ICON_SIZE = 16;

const CATEGORY_ICON_MAP: Record<string, ReactElement> = {
  "Video Editing": <Video size={18} />,
  "Graphic Design": <Palette size={18} />,
  "Web Development": <Code size={18} />,
  "Photo Editing": <Palette size={18} />,
};

const CLIENT_ICON_MAP: Record<string, (size: number) => ReactElement> = {
  User: (size) => <User size={size} />,
  Coffee: (size) => <Coffee size={size} />,
  Link: (size) => <LinkIcon size={size} />,
  ShoppingCart: (size) => <ShoppingCart size={size} />,
  Users: (size) => <Users size={size} />,
  Search: (size) => <Search size={size} />,
};

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState<string>(ALL_FILTER);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  const { navigateWithTransition, router } = useViewTransition();
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const pathname = usePathname();
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const listTweenRef = useRef<gsap.core.Tween | null>(null);
  const listScrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    // Clear the "pending" state once navigation completes.
    setPendingHref(null);
  }, [pathname]);

  const filteredProjects: ProjectData[] = useMemo(() => {
    if (activeFilter === ALL_FILTER) return projectsData;
    return projectsData.filter((project) => project.categories.includes(activeFilter));
  }, [activeFilter]);

  const handleFilterChange = useCallback((filter: string) => {
    setIsFirstLoad(false);
    setActiveFilter(filter);
  }, []);

  // Category counts (memoized)
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { [ALL_FILTER]: projectsData.length };

    for (const project of projectsData) {
      for (const cat of project.categories) {
        counts[cat] = (counts[cat] ?? 0) + 1;
      }
    }

    return counts;
  }, []);

  // Get unique categories for tabs
  const categories = useMemo(() => {
    const cats = new Set<string>();
    projectsData.forEach((project) => {
      project.categories.forEach((cat) => cats.add(cat));
    });
    return Array.from(cats).sort();
  }, []);

  // Map category to icon
  const getCategoryIcon = useCallback((category: string) => {
    return CATEGORY_ICON_MAP[category] ?? <Briefcase size={18} />;
  }, []);

  const handleProjectClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();

      if (pendingHref) return;

      const currentPath = window.location.pathname;
      if (currentPath === href) {
        return;
      }

      setPendingHref(href);

      // Fallback: if navigation is slow/stalls in dev, don't lock taps forever.
      window.setTimeout(() => {
        setPendingHref((current) => (current === href ? null : current));
      }, 2500);

      // Immediate feedback for mobile/slow route compilation.
      const target = e.currentTarget.querySelector(".project-inner") as HTMLElement | null;
      if (target) {
        gsap.killTweensOf(target);
        gsap.to(target, {
          scale: 0.98,
          duration: 0.12,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
          clearProps: "transform",
        });
      }

      navigateWithTransition(href);
    },
    [navigateWithTransition, pendingHref]
  );

  const handleProjectPointerDown = useCallback(
    (href: string) => {
      // Start fetching/compiling the destination as early as possible.
      // In dev mode this helps reduce the perceived "click not working" delay.
      if (typeof router?.prefetch === "function") {
        router.prefetch(href);
      }
    },
    [router]
  );

  // Map client icon name to icon component
  const getClientIcon = useCallback((iconName: string) => {
    return CLIENT_ICON_MAP[iconName]?.(CLIENT_ICON_SIZE) ?? (
      <Briefcase size={CLIENT_ICON_SIZE} />
    );
  }, []);

  useGSAP(
    () => {
      const tabButtons = tabsRef.current
        ? (Array.from(
          tabsRef.current.querySelectorAll("button.projects-tab")
        ) as HTMLElement[])
        : [];

      // Tabs: simple entrance animation (no ScrollTrigger needed)
      if (tabButtons.length) {
        gsap.set(tabButtons, { y: 16, opacity: 0 });
        gsap.to(tabButtons, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.04,
          delay: 1.1,
          overwrite: true,
        });
      }
    },
    { dependencies: [] }
  );

  useGSAP(
    () => {
      const projectCards = listRef.current
        ? (Array.from(
          listRef.current.querySelectorAll("a.project")
        ) as HTMLElement[])
        : [];

      const listEnterDelay = isFirstLoad ? 1.35 : 0.12;

      // Project cards: batched reveal on scroll + stagger. Re-run on filter change.
      if (projectCards.length) {
        listTweenRef.current?.kill();
        listTweenRef.current = null;
        listScrollTriggerRef.current?.kill();
        listScrollTriggerRef.current = null;

        // When React reuses DOM nodes (stable keys), make sure any previous GSAP inline
        // styles are cleared so the layout/appearance stays consistent.
        gsap.set(projectCards, { clearProps: "opacity,transform" });
        gsap.set(projectCards, { opacity: 0, y: 30 });

        if (isFirstLoad) {
          const tween = gsap.fromTo(
            projectCards,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.08,
              delay: listEnterDelay,
              clearProps: "opacity,transform",
              scrollTrigger: {
                trigger: listRef.current,
                start: "top 85%",
                once: true,
              },
            }
          );

          listTweenRef.current = tween;
          listScrollTriggerRef.current = tween.scrollTrigger as ScrollTrigger;
        } else {
          const tween = gsap.to(projectCards, {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
            stagger: 0.06,
            delay: listEnterDelay,
            clearProps: "opacity,transform",
            overwrite: true,
          });
          listTweenRef.current = tween;
        }
      }

      // Ensure ScrollTrigger recalculates positions after the list changes.
      if (isFirstLoad) {
        ScrollTrigger.refresh();
      }

      return () => {
        listTweenRef.current?.kill();
        listTweenRef.current = null;
        listScrollTriggerRef.current?.kill();
        listScrollTriggerRef.current = null;
      };
    },
    { dependencies: [activeFilter, isFirstLoad] }
  );

  return (
    <>
      <Nav />
      <div className="projects" data-route-root>
        <section className="projects-header">
          <div className="container">
            <div className="prop-col"></div>
            <div className="prop-col">
              <SplitTextAnimate delay={1}>
                <h1>Recent Projects</h1>
              </SplitTextAnimate>
              <div className="projects-tabs" ref={tabsRef}>
                <button
                  className={`projects-tab ${activeFilter === ALL_FILTER ? "active" : ""}`}
                  onClick={() => handleFilterChange(ALL_FILTER)}
                  aria-label={`View All Projects (${categoryCounts[ALL_FILTER]} items)`}
                  aria-pressed={activeFilter === ALL_FILTER}
                >
                  <Briefcase size={18} />
                  <span>All</span>
                  <span className="projects-tab-count">({categoryCounts[ALL_FILTER]})</span>
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`projects-tab ${activeFilter === category ? "active" : ""}`}
                    onClick={() => handleFilterChange(category)}
                    aria-label={`View ${category} Projects (${categoryCounts[category]} items)`}
                    aria-pressed={activeFilter === category}
                  >
                    {getCategoryIcon(category)}
                    <span>{category}</span>
                    <span className="projects-tab-count">({categoryCounts[category]})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="projects-list">
          <div className="container" ref={listRef}>
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                href={project.route}
                scroll={true}
                className="project"
                data-project-id={project.id}
                aria-disabled={pendingHref ? true : undefined}
                onPointerDown={() => handleProjectPointerDown(project.route)}
                onClick={(e) => handleProjectClick(e, project.route)}
              >
                <div className="project-inner">
                  <div className="project-img featured-project-card-img">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      sizes="(max-width: 1000px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="project-info">
                    <div className="project-content">
                      <h3>{project.name}</h3>
                      <p className="project-description">{project.description}</p>
                    </div>
                    <div className="project-meta">
                      <div className="project-date">
                        <p>{project.date}</p>
                      </div>
                      <div className="project-client">
                        <div className="project-client-icon">
                          {getClientIcon(project.clientIcon)}
                        </div>
                        <p>{project.clientName}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <ConditionalFooter />
    </>
  );
};

export default ProjectsPage;
