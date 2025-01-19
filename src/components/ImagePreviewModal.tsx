import { X } from 'lucide-react';

interface ImagePreviewModalProps {
  imageUrl: string;
  alt: string;
  onClose: () => void;
}

export function ImagePreviewModal({ imageUrl, alt, onClose }: ImagePreviewModalProps) {
  return (
    <div
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="relative max-w-3xl max-h-[90vh] p-4">
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 p-1 bg-destructive text-destructive-foreground rounded-full"
        >
          <X className="h-4 w-4" />
        </button>
        <img
          src={imageUrl}
          alt={alt}
          className="max-w-full max-h-[85vh] object-contain rounded-lg"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
} 