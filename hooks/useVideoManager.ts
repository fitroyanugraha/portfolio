"use client";

import { useRef, useCallback } from "react";

export interface UseVideoManagerReturn {
    videoRefs: React.MutableRefObject<Record<string, HTMLVideoElement | null>>;
    pauseAll: (resetTime?: boolean) => void;
    cleanup: () => void;
}

/**
 * Centralized video management for gallery/modals.
 * - `videoRefs` is a shared registry for active videos
 * - `pauseAll` pauses all videos (optionally resetting currentTime)
 * - `cleanup` pauses, clears src, and removes refs (for unmount)
 */
export const useVideoManager = (): UseVideoManagerReturn => {
    const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

    const pauseAll = useCallback((resetTime: boolean = false) => {
        Object.values(videoRefs.current).forEach((video) => {
            if (video) {
                video.pause();
                if (resetTime) {
                    video.currentTime = 0;
                }
            }
        });
    }, []);

    const cleanup = useCallback(() => {
        Object.entries(videoRefs.current).forEach(([key, video]) => {
            if (video) {
                try {
                    video.pause();
                    video.src = "";
                } catch {
                    // ignore cleanup errors
                }
            }
            delete videoRefs.current[key];
        });
    }, []);

    return {
        videoRefs,
        pauseAll,
        cleanup,
    };
};

export default useVideoManager;
