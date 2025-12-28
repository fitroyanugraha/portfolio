/**
 * Hook to wait for fonts to be loaded before running animations
 * Prevents layout shifts and ensures proper text measurement
 */
export const useFontLoader = () => {
  const waitForFonts = async () => {
    try {
      // Wait for all fonts to be ready
      await document.fonts.ready;

      // Check custom fonts specifically
      const customFonts = ["Manrope", "DM Mono"];
      const fontCheckPromises = customFonts.map((fontFamily) => {
        return document.fonts.check(`16px ${fontFamily}`);
      });

      await Promise.all(fontCheckPromises);
      
      // Small buffer to ensure everything is settled
      await new Promise((resolve) => setTimeout(resolve, 100));

      return true;
    } catch (error) {
      console.warn("Font loading error:", error);
      // Fallback delay if font checking fails
      await new Promise((resolve) => setTimeout(resolve, 200));
      return true;
    }
  };

  return { waitForFonts };
};
