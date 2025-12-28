"use client";

import React from "react";
import SplitTextAnimate from "@/components/SplitText/SplitText";
import AnimatedItem from "@/components/AnimateItem/AnimateItem";
import Image from "next/image";
import styles from "./FinalImpact.module.css";

export type TagItem = {
  label: string;
};

interface FinalImpactProps {
  label: string;
  title: string;
  description: string | React.ReactNode;
  tags: TagItem[];
  imageSrc: string;
  imageAlt: string;
  onMouseMove?: (e: React.MouseEvent<HTMLDivElement>) => void;
  delay?: number;
  className?: string;
}

const FinalImpact = React.memo<FinalImpactProps>(({
  label,
  title,
  description,
  tags,
  imageSrc,
  imageAlt,
  onMouseMove,
  delay = 0.35,
  className = "",
}) => {

  return (
    <div className={`${styles["final-impact"]} ${className}`.trim()}>
      <div className={styles["final-grid"]}>
        <div className={styles["final-content"]}>
          <SplitTextAnimate delay={delay}>
            <div className={styles["final-header"]}>
              <p className={styles["final-label"]}>{label}</p>
              <h2 className={styles["final-title"]}>{title}</h2>
            </div>
          </SplitTextAnimate>

          <SplitTextAnimate delay={delay + 0.05}>
            <p className={styles["final-text"]}>{description}</p>
          </SplitTextAnimate>

          <SplitTextAnimate delay={delay + 0.1}>
            <div className={styles["final-tags-wrapper"]}>
              <div className={styles["final-tags"]}>
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className={styles["final-tag"]}
                  >
                    <div className={styles["tag-background"]}></div>
                    <div className={styles["tag-inner-glow"]}></div>
                    <span className={styles["tag-label"]}>{tag.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </SplitTextAnimate>
        </div>

        <AnimatedItem delay={delay + 0.15}>
          <div className={styles["final-image-container"]}>
            <div className={styles["final-image-wrapper"]}>
              <Image src={imageSrc} alt={imageAlt} className={styles["final-image"]} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
              <div className={styles["image-overlay"]}></div>
            </div>
          </div>
        </AnimatedItem>
      </div>
    </div>
  );
});

FinalImpact.displayName = 'FinalImpact';

export default FinalImpact;
