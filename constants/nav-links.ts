export interface NavLink {
    label: string;
    href: string;
}

export const NAV_LINKS: NavLink[] = [
    {
        label: "Home",
        href: "/",
    },
    {
        label: "About",
        href: "/about",
    },
    {
        label: "Projects",
        href: "/projects",
    },
    {
        label: "Current Project",
        href: "/projects/scan-to-order",
    },
    {
        label: "Gallery",
        href: "/gallery",
    },
    {
        label: "Connect",
        href: "/connect",
    },
];
