import { useState } from 'react';
import { Todo, useTodoStore } from '@/store/todo';
import { Button } from './ui/button';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);
  const { toggleTodo, deleteTodo, editTodo } = useTodoStore();

  const handleEdit = () => {
    if (editValue.trim()) {
      editTodo(todo.id, editValue);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(todo.title);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center gap-2 p-4 bg-card rounded-lg border">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="h-4 w-4 rounded border-primary"
      />
      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="flex-1 rounded-md bg-background px-2 py-1 border"
            autoFocus
          />
          <Button size="icon" variant="ghost" onClick={handleEdit}>
            <Check className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={handleCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          <span
            className={cn(
              'flex-1',
              todo.completed && 'line-through text-muted-foreground'
            )}
          >
            {todo.title}
          </span>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => deleteTodo(todo.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
} 