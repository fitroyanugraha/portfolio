"use client";

import React from "react";
import SplitTextAnimate from "@/components/SplitText/SplitText";
import styles from "./ProcessSteps.module.css";

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

interface ProcessStepsProps {
  steps: ProcessStep[];
  label: string;
  title: string;
  delay?: number;
  className?: string;
}

const ProcessSteps = React.memo<ProcessStepsProps>(({ steps, label, title, delay = 0.1, className = "" }) => {
  return (
    <>
      <div className={`${styles["process-header"]} ${className}`.trim()}>
        <SplitTextAnimate delay={delay}>
          <p className={styles["process-label"]}>{label}</p>
          <h2 className={styles["process-title"]}>{title}</h2>
        </SplitTextAnimate>
      </div>

      <div className={styles["process-grid"]}>
        {steps.map((step, index) => (
          <SplitTextAnimate key={index} delay={delay + 0.15 + (index * 0.05)}>
            <div className={styles["process-item"]}>
              <div className={styles["process-number"]}>{step.number}</div>
              <h3 className={styles["process-item-title"]}>{step.title}</h3>
              <p className={styles["process-item-desc"]}>
                {step.description}
              </p>
            </div>
          </SplitTextAnimate>
        ))}
      </div>
    </>
  );
});

ProcessSteps.displayName = 'ProcessSteps';

export default ProcessSteps;
