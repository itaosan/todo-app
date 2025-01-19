import type { Todo } from '@/store/todo';
import { Check, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { ImagePreviewModal } from './ImagePreviewModal';
import { ImageUpload } from './ImageUpload';
import { Button } from './ui/button';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
  onImageUpload: (id: string, file: File) => void;
  onImageRemove: (id: string) => void;
}

export function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
  onImageUpload,
  onImageRemove,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);
  const [showImagePreview, setShowImagePreview] = useState(false);

  const handleSubmit = () => {
    if (editValue.trim()) {
      onEdit(todo.id, editValue);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditValue(todo.title);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg group">
        {isEditing ? (
          <div className="flex flex-1 items-center gap-2">
            <input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSubmit}
              className="flex-1 rounded-md bg-background px-2 py-1 border"
            />
            <ImageUpload
              imageUrl={todo.imageUrl}
              onImageUpload={(file) => onImageUpload(todo.id, file)}
              onImageRemove={() => onImageRemove(todo.id)}
            />
          </div>
        ) : (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggle(todo.id)}
              className={todo.completed ? 'text-primary' : 'text-muted-foreground'}
            >
              <Check className="h-4 w-4" />
            </Button>
            <div className="flex flex-1 items-center gap-2">
              <span
                className={`flex-1 ${todo.completed ? 'line-through text-muted-foreground' : ''}`}
              >
                {todo.title}
              </span>
              {todo.imageUrl && (
                <button
                  type="button"
                  onClick={() => setShowImagePreview(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setShowImagePreview(true);
                    }
                  }}
                  className="w-12 h-12 p-0 border-0 bg-transparent cursor-pointer"
                  aria-label={`Preview image for ${todo.title}`}
                >
                  <img
                    src={todo.imageUrl}
                    alt={todo.title}
                    className="w-full h-full object-cover rounded-md hover:opacity-80 transition-opacity"
                  />
                </button>
              )}
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditing(true)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(todo.id)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </div>
      {showImagePreview && (
        <ImagePreviewModal
          imageUrl={todo.imageUrl || ''}
          alt={todo.title}
          onClose={() => setShowImagePreview(false)}
        />
      )}
    </>
  );
}
