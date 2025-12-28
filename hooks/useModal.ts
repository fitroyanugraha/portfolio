"use client";

import { useState, useCallback, useEffect, useRef } from "react";

export interface UseModalReturn {
    isOpen: boolean;
    currentIndex: number;
    openModal: (index: number) => void;
    closeModal: () => void;
    next: () => void;
    prev: () => void;
    setIndex: (index: number) => void;
}

/**
 * Reusable modal state hook for galleries/carousels.
 * Pass totalItems (e.g. visibleItems.length) so navigation stays in range.
 */
export const useModal = (totalItems: number, options?: { loop?: boolean }): UseModalReturn => {
    const { loop = true } = options ?? {};

    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsCountRef = useRef(totalItems);

    // Keep an up-to-date reference to the current items count
    useEffect(() => {
        itemsCountRef.current = totalItems;

        setCurrentIndex((prev) => {
            if (totalItems <= 0) return 0;
            return Math.min(prev, totalItems - 1);
        });
    }, [totalItems]);

    const openModal = useCallback(
        (index: number) => {
            if (itemsCountRef.current <= 0) return;
            const maxIndex = itemsCountRef.current - 1;
            const safeIndex = Math.min(Math.max(index, 0), maxIndex);
            setCurrentIndex(safeIndex);
            setIsOpen(true);
        },
        []
    );

    const closeModal = useCallback(() => {
        setIsOpen(false);
    }, []);

    const next = useCallback(() => {
        setCurrentIndex((prev) => {
            const count = itemsCountRef.current;
            if (count <= 0) return 0;
            if (loop) {
                return (prev + 1) % count;
            }
            return Math.min(prev + 1, count - 1);
        });
    }, [loop]);

    const prev = useCallback(() => {
        setCurrentIndex((prev) => {
            const count = itemsCountRef.current;
            if (count <= 0) return 0;
            if (loop) {
                return (prev - 1 + count) % count;
            }
            return Math.max(prev - 1, 0);
        });
    }, [loop]);

    const setIndex = useCallback((index: number) => {
        const count = itemsCountRef.current;
        if (count <= 0) return;
        const maxIndex = count - 1;
        const safeIndex = Math.min(Math.max(index, 0), maxIndex);
        setCurrentIndex(safeIndex);
    }, []);

    return {
        isOpen,
        currentIndex,
        openModal,
        closeModal,
        next,
        prev,
        setIndex,
    };
};

export default useModal;
