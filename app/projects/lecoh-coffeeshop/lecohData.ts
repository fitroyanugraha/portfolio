// Type Definitions
export type GalleryItem = {
  type: 'image' | 'video' | 'pdf';
  src: string;
  thumbnail?: string;
  alt: string;
  category: 'stories' | 'reels' | 'menu';
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
  { type: 'image', src: '/lecoh/ig-stories/1.webp', alt: 'Instagram Story 1', category: 'stories' },
  { type: 'image', src: '/lecoh/ig-stories/2.webp', alt: 'Instagram Story 2', category: 'stories' },
  { type: 'image', src: '/lecoh/ig-stories/3.webp', alt: 'Instagram Story 3', category: 'stories' },
  { type: 'image', src: '/lecoh/ig-stories/4.webp', alt: 'Instagram Story 4', category: 'stories' },
  { type: 'image', src: '/lecoh/ig-stories/5.webp', alt: 'Instagram Story 5', category: 'stories' },
  { type: 'video', src: '/lecoh/ig-stories/video/1.mp4', alt: 'Instagram Story Video 1', category: 'stories' },
  { type: 'video', src: '/lecoh/ig-stories/video/2.mp4', alt: 'Instagram Story Video 2', category: 'stories' },

  // Reels
  { type: 'video', src: '/lecoh/reels/1.mp4', alt: 'Reel Video 1', category: 'reels' },
  { type: 'video', src: '/lecoh/reels/2.mp4', alt: 'Reel Video 2', category: 'reels' },
  { type: 'video', src: '/lecoh/reels/3.mp4', alt: 'Reel Video 3', category: 'reels' },

  // Menu
  { type: 'image', src: '/lecoh/book-menu/menu le.coh.webp', alt: 'Le.Coh Menu Book', category: 'menu' },
];

// Color Palette Data
export const colorPalette: ColorItem[] = [
  {
    hex: '#000000',
    rgb: '0, 0, 0',
    name: 'Deep Black',
    description: 'Used for text and separator lines for maximum contrast',
  },
  {
    hex: '#FFFFFF',
    rgb: '255, 255, 255',
    name: 'Pure White',
    description: 'Clean background color that enhances visual clarity',
    isLight: true,
  },
  {
    hex: '#967F2F',
    rgb: '150, 127, 47',
    name: 'Antique Gold',
    description: 'Primary gold color used for the illustration and main accents',
  },
  {
    hex: '#CBBF97',
    rgb: '203, 191, 151',
    name: 'Soft Gold Beige',
    description: 'Secondary highlight tone appearing in lighter parts of the illustration',
  },
];

// Highlight Items Data
export const highlights: HighlightItem[] = [
  {
    icon: 'Video',
    title: 'Video Content Creation',
    description: 'Produced engaging reels and stories that capture the coffeeshop\'s atmosphere and lifestyle',
  },
  {
    icon: 'ImageIcon',
    title: 'Social Media Design',
    description: 'Designed cohesive visual content for Instagram stories and promotional materials',
  },
  {
    icon: 'Coffee',
    title: 'Menu & Branding',
    description: 'Created menu designs and brand materials that reflect the coffeeshop\'s identity',
  },
];

// Tags Data
export const tags: TagItem[] = [
  { label: 'Video Editing' },
  { label: 'Social Media Content' },
  { label: 'Menu Design' },
];

// Process Steps Data
export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Brand Discovery',
    description: 'Analyzed Le.Coh\'s positioning and target audience to establish visual direction.',
  },
  {
    number: '02',
    title: 'Content Strategy',
    description: 'Planned content calendar for social media with consistent brand voice.',
  },
  {
    number: '03',
    title: 'Video Production',
    description: 'Created video content and lifestyle photography using CapCut for editing.',
  },
  {
    number: '04',
    title: 'Brand Design',
    description: 'Designed menu layouts and branded materials reinforcing brand identity.',
  },
];
