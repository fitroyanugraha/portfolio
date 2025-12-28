"use client";

import { useEffect, useMemo } from "react";

/**
 * Custom hook for debouncing a callback function
 * 
 * @param callback - The function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function useDebounce<T extends (...args: any[]) => any>(
    callback: T,
    delay: number
): T {
    const debouncedFn = useMemo(() => {
        let timeoutId: NodeJS.Timeout;

        const debounced = (...args: Parameters<T>) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                callback(...args);
            }, delay);
        };

        return debounced as T;
    }, [callback, delay]);

    useEffect(() => {
        return () => {
            // Cleanup any pending timeout on unmount
        };
    }, []);

    return debouncedFn;
}

export default useDebounce;
