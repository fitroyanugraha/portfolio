export interface ProjectData {
  id: number;
  categories: string[];
  image: string;
  date: string;
  name: string;
  description: string;
  clientIcon: string;
  clientName: string;
  route: string;
}

export const projectsData: ProjectData[] = [
  {
    id: 1,
    categories: ["Video Editing", "Graphic Design", "Photo Editing"],
    image: "/projects/kriplix.webp",
    date: "April 4, 2023",
    name: "Youtube Channel Kriplix",
    description: "Personal Youtube Channel",
    clientIcon: "User",
    clientName: "Personal Project",
    route: "/projects/youtube-kriplix",
  },
  {
    id: 2,
    categories: ["Graphic Design"],
    image: "/projects/ruto.webp",
    date: "March 10, 2024",
    name: "Ruto Coffee",
    description: "Social Media Content and Book Menu",
    clientIcon: "Users",
    clientName: "Ruto Management",
    route: "/projects/ruto-coffee",
  },
  {
    id: 3,
    categories: ["Video Editing", "Graphic Design", "Photo Editing"],
    image: "/projects/lecoh.webp",
    date: "December 14, 2023",
    name: "Le.Coh Coffeeshop",
    description: "Social Media Content, and Menu Design",
    clientIcon: "Users",
    clientName: "Le.coh Management",
    route: "/projects/lecoh-coffeeshop",
  },
  {
    id: 4,
    categories: ["Web Development"],
    image: "/projects/linktree-web-app.webp",
    date: "September 12, 2025",
    name: "Personal Linktree",
    description: "Linktree Clone with React JS",
    clientIcon: "User",
    clientName: "Personal Project",
    route: "/projects/linktree-web-app",
  },

  {
    id: 5,
    categories: ["Web Development"],
    image: "/projects/order-system.webp",
    date: "October 3, 2025",
    name: "Scan To Order",
    description: "Fullstack Scan to Order App",
    clientIcon: "User",
    clientName: "Personal Project",
    route: "/projects/scan-to-order",
  },
];
