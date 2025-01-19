import { X } from 'lucide-react';
import { KeyboardEvent } from 'react';

interface ImagePreviewModalProps {
  imageUrl: string;
  alt: string;
  onClose: () => void;
}

export function ImagePreviewModal({ imageUrl, alt, onClose }: ImagePreviewModalProps) {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      tabIndex={0}
    >
      <div className="relative max-w-3xl max-h-[90vh] p-4">
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 p-1 bg-destructive text-destructive-foreground rounded-full"
          type="button"
          aria-label="Close preview"
        >
          <X className="h-4 w-4" />
        </button>
        <img
          src={imageUrl}
          alt={alt}
          className="max-w-full max-h-[85vh] object-contain rounded-lg"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          tabIndex={0}
        />
      </div>
    </div>
  );
}
