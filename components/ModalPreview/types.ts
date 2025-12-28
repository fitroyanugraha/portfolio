export interface ModalItem {
  src: string;
  alt: string;
  type: 'image' | 'video' | 'pdf';
  thumbnail?: string;
}

export interface ModalPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  items: ModalItem[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  videoRefs?: React.MutableRefObject<{[key: number]: HTMLVideoElement | null}>;
}
