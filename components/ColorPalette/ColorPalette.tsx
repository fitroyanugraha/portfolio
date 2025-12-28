import React from 'react';
import AnimatedItem from '../AnimateItem/AnimateItem';
import styles from './ColorPalette.module.css';

export type ColorItem = {
  hex: string;
  rgb: string;
  name: string;
  description: string;
  isLight?: boolean;
};

type ColorPaletteProps = {
  colors: ColorItem[];
  animationDelay?: number;
};

const ColorPalette: React.FC<ColorPaletteProps> = ({ colors, animationDelay = 0.15 }) => {
  return (
    <div className={styles["color-palette-grid"]}>
      {colors.map((color, index) => (
        <AnimatedItem key={index} delay={0.2}>
          <div className={styles["color-palette-card"]}>
            <div
              className={`${styles["color-palette-swatch"]} ${color.isLight ? styles["color-palette-swatch-light"] : ""
                }`}
              style={{ backgroundColor: color.hex }}
            >
              <div className={styles["color-palette-overlay"]}>
                <span className={styles["color-rgb"]}>{color.rgb}</span>
              </div>
            </div>
            <div className={styles["color-palette-info"]}>
              <h3>{color.name}</h3>
              <p className={styles["color-palette-desc"]}>
                {color.description}
              </p>
            </div>
          </div>
        </AnimatedItem>
      ))}
    </div>
  );
};

export default ColorPalette;
