import { useEffect, useRef } from 'react';

interface UseVideoIntersectionOptions {
    threshold?: number;
    rootMargin?: string;
}

/**
 * Hook to lazy load videos using Intersection Observer
 * Only loads video metadata when video is near viewport
 */
export const useVideoIntersection = (
    options: UseVideoIntersectionOptions = {}
) => {
    const { threshold = 0.1, rootMargin = '200px' } = options;
    const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        // Create Intersection Observer
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const video = entry.target as HTMLVideoElement;

                    if (entry.isIntersecting) {
                        // Video is near viewport - load it
                        if (video.dataset.src && !video.src) {
                            video.src = video.dataset.src;
                            video.load();
                        }
                    }
                });
            },
            {
                threshold,
                rootMargin,
            }
        );

        // Observe all registered videos
        videoRefs.current.forEach((video) => {
            if (observerRef.current) {
                observerRef.current.observe(video);
            }
        });

        return () => {
            // Cleanup
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [threshold, rootMargin]);

    const registerVideo = (id: string, videoElement: HTMLVideoElement | null) => {
        if (videoElement) {
            videoRefs.current.set(id, videoElement);

            // If observer already exists, observe this new video
            if (observerRef.current) {
                observerRef.current.observe(videoElement);
            }
        } else {
            // Video unmounted, remove from map
            const video = videoRefs.current.get(id);
            if (video && observerRef.current) {
                observerRef.current.unobserve(video);
            }
            videoRefs.current.delete(id);
        }
    };

    return { registerVideo };
};
