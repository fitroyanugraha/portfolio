// Type Definitions
export type ColorItem = {
  hex: string;
  rgb: string;
  name: string;
  description: string;
  isLight?: boolean;
};

export type ThumbnailItem = {
  src: string;
  alt: string;
};

export type HighlightItem = {
  icon: string;
  title: string;
  description: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type TagItem = {
  label: string;
};

// Color Palette Data
export const colorPalette: ColorItem[] = [
  {
    hex: '#E50914',
    rgb: '229, 9, 20',
    name: 'Primary Red',
    description: 'Bold, energetic red that captures attention and drives visual impact.',
  },
  {
    hex: '#000000',
    rgb: '0, 0, 0',
    name: 'Deep Black',
    description: 'Deep contrast for mystery and cinematic elegance.',
  },
  {
    hex: '#FFFFFF',
    rgb: '255, 255, 255',
    name: 'Clean White',
    description: 'Crisp white for readability and modern balance.',
    isLight: true,
  },
  {
    hex: '#D6254A',
    rgb: '214, 37, 74',
    name: 'Accent Pink Red',
    description: 'Playful accent for labels and modern brand energy.',
  },
];

// Thumbnail Data
export const thumbnails: ThumbnailItem[] = [
  {
    src: '/kriplix-youtube/thumbnail/1.webp',
    alt: 'Youtube Thumbnail Design 1',
  },
  {
    src: '/kriplix-youtube/thumbnail/2.webp',
    alt: 'Youtube Thumbnail Design 2',
  },
  {
    src: '/kriplix-youtube/thumbnail/3.webp',
    alt: 'Youtube Thumbnail Design 3',
  },
  {
    src: '/kriplix-youtube/thumbnail/4.webp',
    alt: 'Youtube Thumbnail Design 4',
  },
];

// Highlight Items Data
export const highlights: HighlightItem[] = [
  {
    icon: 'Video',
    title: 'Movie Recaps',
    description: 'Comprehensive story summaries with engaging narration',
  },
  {
    icon: 'ImageIcon',
    title: 'Clickable Titles',
    description: 'Attention-grabbing thumbnails designed to attract viewers',
  },
  {
    icon: 'Sparkles',
    title: 'Unique Storytelling',
    description: 'Distinctive narrative style that brings plots to life',
  },
];

// Process Steps Data
export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Movie Selection',
    description:
      'Selecting trending movies audiences want to understand by researching plots and analyzing storylines.',
  },
  {
    number: '02',
    title: 'Story Breakdown',
    description:
      'Breaking down complex plots into digestible segments with key moments and character arcs.',
  },
  {
    number: '03',
    title: 'Narrative Scripting',
    description:
      'Crafting engaging narration that retells stories in a unique voice while keeping viewers engaged.',
  },
  {
    number: '04',
    title: 'Final Production',
    description:
      'Editing clips, adding voiceover, designing thumbnails, and creating click-worthy titles.',
  },
];

// Tags Data
export const tags: TagItem[] = [
  { label: 'Story Recaps' },
  { label: 'Thumbnails' },
  { label: 'Unique Storytelling' },
];
