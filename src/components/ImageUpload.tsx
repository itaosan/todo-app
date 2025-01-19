import { ChangeEvent, useRef } from 'react';
import { Button } from './ui/button';
import { ImagePlus, X } from 'lucide-react';

interface ImageUploadProps {
  imageUrl?: string;
  onImageUpload: (imageUrl: string) => void;
  onImageRemove: () => void;
}

export function ImageUpload({ imageUrl, onImageUpload, onImageRemove }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {imageUrl ? (
        <div className="relative group">
          <img
            src={imageUrl}
            alt="Uploaded"
            className="w-16 h-16 object-cover rounded-md"
          />
          <button
            onClick={onImageRemove}
            className="absolute top-0 right-0 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => inputRef.current?.click()}
        >
          <ImagePlus className="h-4 w-4" />
        </Button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
} 