/**
 * Production performance utilities
 */

/**
 * Lazy load component with dynamic import
 */
export const lazyLoad = async <T extends React.ComponentType<any>>(
    importFunc: () => Promise<{ default: T }>
): Promise<T> => {
    const module = await importFunc();
    return module.default;
};

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: any[]) => any>(
    func: T,
    wait: number
): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout | null = null;

    return (...args: Parameters<T>) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

/**
 * Throttle function for scroll/resize events
 */
export const throttle = <T extends (...args: any[]) => any>(
    func: T,
    limit: number
): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean = false;

    return (...args: Parameters<T>) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};

/**
 * Request idle callback polyfill
 */
export const requestIdleCallback =
    typeof window !== "undefined" && "requestIdleCallback" in window
        ? window.requestIdleCallback
        : (cb: IdleRequestCallback) => setTimeout(cb, 1);

export const cancelIdleCallback =
    typeof window !== "undefined" && "cancelIdleCallback" in window
        ? window.cancelIdleCallback
        : (id: number) => clearTimeout(id);

/**
 * Intersection Observer helper for lazy loading
 */
export const observeIntersection = (
    element: Element,
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
): IntersectionObserver => {
    const observer = new IntersectionObserver(callback, {
        rootMargin: "50px",
        threshold: 0.01,
        ...options,
    });

    observer.observe(element);
    return observer;
};

/**
 * Preload critical resources
 */
export const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const img = new window.Image();
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = src;
    });
};

/**
 * Check if device is mobile
 */
export const isMobileDevice = (): boolean => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= 1000;
};

/**
 * Get safe window dimensions
 */
export const getWindowDimensions = () => {
    if (typeof window === "undefined") {
        return { width: 0, height: 0 };
    }
    return {
        width: window.innerWidth,
        height: window.innerHeight,
    };
};
