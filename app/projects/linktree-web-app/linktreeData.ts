// Project Overview
export const projectOverview = {
    title: "Personal Linktree",
    subtitle: "A Personal Linktree-style Web Application",
    description:
        "A sleek and modern personal linktree web application built with React and Vite, featuring social media links and an anonymous contact form with intelligent rate limiting. This project showcases a centralized hub for all important links with clean design and smooth interactions.",
    liveDemo: "https://piter-linktree.vercel.app/",
    github: "https://github.com/fitroyanugraha/linktree",
    deployment: "Vercel",
    dateCompleted: "2024",
    projectType: ["Web Application", "Frontend Development"],
};

// Tech Stack
export const techStack = {
    frontend: [
        { name: "React", version: "19.1.1" },
        { name: "Vite", version: "7.1.7" },
    ],
    styling: [{ name: "CSS3" }],
    libraries: [
        { name: "SweetAlert2" },
        { name: "DOMPurify" },
    ],
    backend: [{ name: "SheetDB" }],
    deployment: [{ name: "Vercel" }],
};

// Key Features
export const keyFeatures = [
    {
        title: "Social Media Navigation",
        description:
            "Instagram, TikTok, LinkedIn, and Portfolio links with mobile app deep linking for Android and iOS",
        icon: "🔗",
    },
    {
        title: "Anonymous Contact Form",
        description:
            "Text area for message input with validation (20-115 characters) and message sanitization",
        icon: "💬",
    },
    {
        title: "Daily Rate Limiting",
        description:
            "Intelligent rate limiting system that restricts messages per day with localStorage persistence",
        icon: "⏱️",
    },
    {
        title: "Responsive Design",
        description:
            "Mobile-first approach with smooth animations and transitions across all devices",
        icon: "📱",
    },
    {
        title: "PWA Support",
        description:
            "Progressive Web App features with offline-ready support and installable on mobile devices",
        icon: "⚡",
    },
    {
        title: "SEO Optimization",
        description:
            "Comprehensive meta tags, Open Graph, Twitter Cards, and JSON-LD structured data",
        icon: "🔍",
    },
];

// User Flow Diagram Data
export const userFlowDiagram = {
    title: "User Interaction Flow",
    description: "Complete flow of user interactions with the Linktree application",
    nodes: [
        {
            id: "start",
            label: "User Opens Linktree",
            type: "start",
            icon: "🌐",
        },
        {
            id: "decision",
            label: "User Action",
            type: "decision",
            icon: "❓",
        },
        // Link Click Path
        {
            id: "click-link",
            label: "Click Link",
            type: "action",
            icon: "🔗",
            parent: "decision",
        },
        {
            id: "is-mobile",
            label: "Is Mobile?",
            type: "decision",
            icon: "📱",
            parent: "click-link",
        },
        {
            id: "try-deep-link",
            label: "Try App Deep Link",
            type: "process",
            icon: "🚀",
            parent: "is-mobile",
        },
        {
            id: "success-check",
            label: "Success?",
            type: "decision",
            icon: "✓",
            parent: "try-deep-link",
        },
        {
            id: "open-app",
            label: "Open App",
            type: "end",
            icon: "✅",
            parent: "success-check",
        },
        {
            id: "open-web",
            label: "Open Web URL",
            type: "end",
            icon: "🌐",
            parent: "is-mobile",
        },
        // Message Path
        {
            id: "send-message",
            label: "Send Message",
            type: "action",
            icon: "💬",
            parent: "decision",
        },
        {
            id: "submit-message",
            label: "Submit Anonymous Message",
            type: "process",
            icon: "📝",
            parent: "send-message",
        },
        {
            id: "check-limit",
            label: "Check Daily Limit",
            type: "decision",
            icon: "⏱️",
            parent: "submit-message",
        },
        {
            id: "save-sheet",
            label: "Save to Google Sheet",
            type: "process",
            icon: "💾",
            parent: "check-limit",
        },
        {
            id: "message-sent",
            label: "Message Sent",
            type: "end",
            icon: "✅",
            parent: "save-sheet",
        },
        {
            id: "rate-limited",
            label: "Rate Limit Reached",
            type: "end",
            icon: "⛔",
            parent: "check-limit",
        },
    ],
};



// Security Features
export const securityFeatures = [
    {
        category: "Input Protection",
        items: [
            "DOMPurify Sanitization - Advanced XSS protection",
            "Input Validation - Minimum/maximum length checks",
            "Rate Limiting - Daily message limits",
        ],
    },
    {
        category: "HTTP Security Headers",
        items: [
            "Content Security Policy (CSP)",
            "Subresource Integrity (SRI)",
            "X-Frame-Options: DENY",
            "X-Content-Type-Options: nosniff",
            "Strict-Transport-Security",
        ],
    },
    {
        category: "Data Protection",
        items: [
            "Environment Variables for sensitive credentials",
            "No Direct Database Access",
            "Production Logging disabled",
        ],
    },
];

// SEO Features
export const seoFeatures = [
    "Complete meta tags & Open Graph",
    "Structured Data (JSON-LD)",
    "robots.txt & sitemap.xml",
    "Canonical URL & Rich snippets",
];
