import React, { useRef, useState } from "react";
import "./MenuBtn.css";

interface MenuBtnProps {
  isOpen: boolean;
  toggleMenu: () => void;
  show?: boolean;
}

const MenuBtn: React.FC<MenuBtnProps> = ({ isOpen, toggleMenu, show = true }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const innerGlowRef = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse move handler for inner glow effect
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || !innerGlowRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Update CSS custom properties for smooth gradient positioning
    innerGlowRef.current.style.setProperty('--mouse-x', `${x}%`);
    innerGlowRef.current.style.setProperty('--mouse-y', `${y}%`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <button
      ref={buttonRef}
      className={`menu-toggle ${isOpen ? "opened" : "closed"} ${show ? "visible" : "hidden"} ${isHovered ? "hovered" : ""}`}
      onClick={toggleMenu}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={isOpen}
      type="button"
    >
      <span className="menu-glow" aria-hidden="true"></span>
      <span className="menu-border" aria-hidden="true"></span>
      <span className="menu-inner-glow" ref={innerGlowRef} aria-hidden="true"></span>
      <div className="menu-toggle-icon">
        <div className="hamburger">
          <div className="menu-bar" data-position="top"></div>
          <div className="menu-bar" data-position="bottom"></div>
        </div>
      </div>
      <div className="menu-copy">
        <p>Menu</p>
      </div>
    </button>
  );
};

export default MenuBtn;
