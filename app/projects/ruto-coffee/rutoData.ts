// Type Definitions
export type GalleryItem = {
  type: 'image' | 'video' | 'pdf';
  src: string;
  thumbnail?: string;
  alt: string;
  category: 'stories' | 'posters' | 'menu';
};

export type ColorItem = {
  hex: string;
  rgb: string;
  name: string;
  description: string;
  isLight?: boolean;
};

export type HighlightItem = {
  icon: string;
  title: string;
  description: string;
};

export type TagItem = {
  label: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

// Gallery Items Data
export const galleryItems: GalleryItem[] = [
  // IG Stories
  { type: 'image', src: '/ruto-coffee/ig-stories/1.webp', alt: 'Instagram Story 1', category: 'stories' },
  { type: 'image', src: '/ruto-coffee/ig-stories/2.webp', alt: 'Instagram Story 2', category: 'stories' },
  { type: 'image', src: '/ruto-coffee/ig-stories/3.webp', alt: 'Instagram Story 3', category: 'stories' },
  { type: 'image', src: '/ruto-coffee/ig-stories/4.webp', alt: 'Instagram Story 4', category: 'stories' },
  { type: 'image', src: '/ruto-coffee/ig-stories/5.webp', alt: 'Instagram Story 5', category: 'stories' },
  { type: 'image', src: '/ruto-coffee/ig-stories/6.webp', alt: 'Instagram Story 6', category: 'stories' },
  { type: 'image', src: '/ruto-coffee/ig-stories/7.webp', alt: 'Instagram Story 7', category: 'stories' },
  { type: 'image', src: '/ruto-coffee/ig-stories/8.webp', alt: 'Instagram Story 8', category: 'stories' },
  { type: 'image', src: '/ruto-coffee/ig-stories/9.webp', alt: 'Instagram Story 9', category: 'stories' },
  { type: 'video', src: '/ruto-coffee/ig-stories/video/1.mp4', alt: 'Instagram Story Video 1', category: 'stories' },
  { type: 'video', src: '/ruto-coffee/ig-stories/video/2.mp4', alt: 'Instagram Story Video 2', category: 'stories' },
  { type: 'video', src: '/ruto-coffee/ig-stories/video/3.mp4', alt: 'Instagram Story Video 3', category: 'stories' },
  { type: 'video', src: '/ruto-coffee/ig-stories/video/4.mp4', alt: 'Instagram Story Video 4', category: 'stories' },

  // Posters
  { type: 'image', src: '/ruto-coffee/poster/1.webp', alt: 'Poster Design 1', category: 'posters' },
  { type: 'image', src: '/ruto-coffee/poster/2.webp', alt: 'Poster Design 2', category: 'posters' },
  { type: 'image', src: '/ruto-coffee/poster/3.webp', alt: 'Poster Design 3', category: 'posters' },
  { type: 'image', src: '/ruto-coffee/poster/4.webp', alt: 'Poster Design 4', category: 'posters' },
  { type: 'image', src: '/ruto-coffee/poster/5.webp', alt: 'Poster Design 5', category: 'posters' },
  { type: 'image', src: '/ruto-coffee/poster/6.webp', alt: 'Poster Design 6', category: 'posters' },

  // Menu
  {
    type: 'pdf',
    src: '/ruto-coffee/book-menu/Beverage Menu Ruto.pdf.pdf',
    thumbnail: '/ruto-coffee/book-menu/Beverage Menu Ruto thumbnail.webp',
    alt: 'Beverage Menu',
    category: 'menu'
  },
  {
    type: 'image',
    src: '/ruto-coffee/book-menu/Food Menu Ruto thumbnail.webp',
    alt: 'Food Menu',
    category: 'menu'
  },
];

// Color Palette Data
export const colorPalette: ColorItem[] = [
  {
    hex: '#C53030',
    rgb: '197, 48, 48',
    name: 'Vibrant Red',
    description: 'Primary accent color used for titles, icons, and key highlights',
  },
  {
    hex: '#A94526',
    rgb: '169, 69, 38',
    name: 'Brand Burnt Orange',
    description: 'Supporting color that adds energy and visual impact',
  },
  {
    hex: '#C8C6C0',
    rgb: '200, 198, 192',
    name: 'Gentle Grey',
    description: 'Subtle line color used for illustrations and fine details',
  },
  {
    hex: '#F7F6ED',
    rgb: '247, 246, 237',
    name: 'Soft Cream',
    description: 'Clean, neutral background tone that creates a warm atmosphere',
    isLight: true,
  },
];


// Highlight Items Data
export const highlights: HighlightItem[] = [
  {
    icon: 'Palette',
    title: 'Brand Strategy',
    description: 'Developed comprehensive visual identity system with color palette, typography, and design guidelines',
  },
  {
    icon: 'ImageIcon',
    title: 'Content Design',
    description: 'Created engaging social media content and promotional materials that resonate with target audience',
  },
  {
    icon: 'Coffee',
    title: 'Menu Design',
    description: 'Designed cohesive menu layouts that reflect brand values and enhance customer experience',
  },
];

// Tags Data
export const tags: TagItem[] = [
  { label: 'Brand Identity Design' },
  { label: 'Social Media' },
  { label: 'Menu Design' },
];

// Process Steps Data
export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Brand Research & Strategy',
    description: 'Analyzed Ruto Coffee\'s positioning as a Japanese-inspired café and researched competitor brands to develop a cohesive visual direction.',
  },
  {
    number: '02',
    title: 'Visual Identity Development',
    description: 'Created brand guidelines including color palette, typography, and design patterns reflecting Japanese minimalism and modern café culture.',
  },
  {
    number: '03',
    title: 'Content Strategy & Creation',
    description: 'Designed engaging Instagram stories, posters, and promotional materials maintaining consistent brand voice across platforms.',
  },
  {
    number: '04',
    title: 'Menu & Experience Design',
    description: 'Designed menu layouts and branded materials that enhance customer experience across digital and physical touchpoints.',
  },
];
