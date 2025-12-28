/**
 * Structured Data (JSON-LD) component for better SEO
 */

interface StructuredDataProps {
    data: object;
}

export default function StructuredData({ data }: StructuredDataProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
            suppressHydrationWarning
        />
    );
}

// Person schema for portfolio owner
export const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Fitroya Nugraha Saleh",
    url: "https://fitroyanugraha.vercel.app",
    image: "https://fitroyanugraha.vercel.app/about/about.webp",
    sameAs: [
        "https://www.linkedin.com/in/fitroyanugraha",
        "https://www.instagram.com/fitroyanugraha",
        "https://github.com/fitroyanugraha",
    ],
    jobTitle: "Creative Designer & Web Developer",
    worksFor: {
        "@type": "Organization",
        name: "Freelance",
    },
    knowsAbout: [
        "Video Editing",
        "Graphic Design",
        "Web Development",
        "Next.js",
        "React",
        "TypeScript",
    ],
};

// Portfolio website schema
export const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Fitroya Nugraha Portfolio",
    url: "https://fitroyanugraha.vercel.app",
    description:
        "Portfolio showcasing video editing, graphic design, and web development projects",
    author: {
        "@type": "Person",
        name: "Fitroya Nugraha Saleh",
    },
    inLanguage: "en-US",
};

// Portfolio/Creative Work schema
export const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "Fitroya Nugraha Portfolio",
    description:
        "Professional portfolio featuring video editing, graphic design, and web development work",
    creator: {
        "@type": "Person",
        name: "Fitroya Nugraha Saleh",
    },
    url: "https://fitroyanugraha.vercel.app",
};
