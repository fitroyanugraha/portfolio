import { Metadata } from "next";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fitroyanugraha.vercel.app";

export const absoluteUrl = (path: string) => {
    if (!path) return siteUrl;
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    const normalized = path.startsWith("/") ? path : `/${path}`;
    return `${siteUrl}${normalized}`;
};

export interface PageMetadata {
    title: string;
    description: string;
    keywords?: string[];
    image?: string;
    noIndex?: boolean;
    path?: string;
}

export const generateMetadata = ({
    title,
    description,
    keywords = [],
    image = "/projects/kriplix.webp",
    noIndex = false,
    path,
}: PageMetadata): Metadata => {
    // Don't add suffix here - Next.js template will handle it
    const metaTitle = title;
    const metaDescription = description;

    return {
        title: metaTitle,
        description: metaDescription,
        keywords: keywords.join(", "),
        authors: [{ name: "Fitroya Nugraha Saleh" }],
        creator: "Fitroya Nugraha Saleh",
        robots: noIndex
            ? {
                index: false,
                follow: false,
            }
            : {
                index: true,
                follow: true,
            },
        openGraph: {
            type: "website",
            locale: "en_US",
            url: absoluteUrl(path ?? "/"),
            title: metaTitle,
            description: metaDescription,
            siteName: "Fitroya Nugraha Portfolio",
            images: [
                {
                    url: absoluteUrl(image),
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: metaTitle,
            description: metaDescription,
            images: [absoluteUrl(image)],
        },
        alternates: {
            canonical: absoluteUrl(path ?? "/"),
        },
    };
};

export const defaultMetadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: "Fitroya Nugraha | Creative Designer & Web Developer",
        template: "%s",
    },
    description:
        "Portfolio of Fitroya Nugraha - Video Editor, Graphic Designer, and Next.js Developer creating meaningful digital experiences.",
    keywords: [
        "video editing",
        "graphic design",
        "web development",
        "Next.js",
        "portfolio",
        "creative design",
        "Fitroya Nugraha",
        "Indonesia",
        "freelance designer",
        "freelance developer",
    ],
    authors: [{ name: "Fitroya Nugraha Saleh", url: siteUrl }],
    creator: "Fitroya Nugraha Saleh",
    publisher: "Fitroya Nugraha Saleh",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteUrl,
        siteName: "Fitroya Nugraha Portfolio",
        title: "Fitroya Nugraha | Creative Designer & Developer",
        description:
            "Portfolio of Fitroya Nugraha - Video Editor, Graphic Designer, and Next.js Developer creating meaningful digital experiences.",
        images: [
            {
                url: `${siteUrl}/projects/kriplix.webp`,
                width: 1200,
                height: 630,
                alt: "Fitroya Nugraha Portfolio",
                type: "image/webp",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Fitroya Nugraha | Creative Designer & Developer",
        description:
            "Portfolio of Fitroya Nugraha - Video Editor, Graphic Designer, and Next.js Developer creating meaningful digital experiences.",
        images: [`${siteUrl}/projects/kriplix.webp`],
        creator: "@fitroyanugraha",
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: [
            { url: "/assets/star.svg", type: "image/svg+xml" },
        ],
        shortcut: "/assets/star.svg",
        apple: "/assets/star.svg",
    },
    // manifest: "/site.webmanifest",
    category: "portfolio",
    verification: {
        // Add your verification codes when available
        // google: 'your-google-site-verification',
        // yandex: 'your-yandex-verification',
    },
};
