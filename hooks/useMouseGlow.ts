import { useCallback } from "react";

/**
 * Hook to handle mouse glow effect on elements
 * Tracks mouse position and updates CSS custom properties for radial gradient effect
 */
export const useMouseGlow = () => {
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>, glowSelector: string = ".tag-inner-glow") => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      const glow = e.currentTarget.querySelector(glowSelector) as HTMLElement;
      if (glow) {
        glow.style.setProperty("--mouse-x", `${x}%`);
        glow.style.setProperty("--mouse-y", `${y}%`);
      }
    },
    []
  );

  return { handleMouseMove };
};
