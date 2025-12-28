"use client";

import "./Toast.css";
import React, { useEffect } from "react";

type ToastProps = {
    open: boolean;
    message: string;
    duration?: number;
    onClose?: () => void;
};

export default function Toast({ open, message, duration = 1500, onClose }: ToastProps) {
    useEffect(() => {
        if (!open) return;

        const t = window.setTimeout(() => {
            onClose?.();
        }, duration);

        return () => {
            window.clearTimeout(t);
        };
    }, [open, duration, onClose]);

    if (!open) return null;

    return (
        <div className="toast" role="status" aria-live="polite">
            {message}
        </div>
    );
}
