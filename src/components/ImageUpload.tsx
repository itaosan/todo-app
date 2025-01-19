import { ImagePlus, X } from 'lucide-react';
import { type ChangeEvent, useRef, useState } from 'react';
import { Button } from './ui/button';

interface ImageUploadProps {
  imageUrl?: string;
  onImageUpload: (file: File) => void;
  onImageRemove: () => void;
}

export function ImageUpload({ imageUrl, onImageUpload, onImageRemove }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <div className="relative">
      {imageUrl ? (
        <div className="relative group">
          <img src={imageUrl} alt="Uploaded" className="w-16 h-16 object-cover rounded-md" />
          <button
            onClick={onImageRemove}
            className="absolute top-0 right-0 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            type="button"
            aria-label="Remove image"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label
          className={`flex items-center justify-center w-16 h-16 border-2 border-dashed rounded-md cursor-pointer transition-colors ${
            isDragging ? 'border-primary bg-primary/10' : 'border-muted-foreground/50'
          }`}
          onDragEnter={handleDragEnter}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            aria-label="Upload image"
          />
          <span className="text-sm text-muted-foreground">+</span>
        </label>
      )}
    </div>
  );
}
