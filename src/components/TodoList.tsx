import { useState } from 'react';
import { useTodoStore } from '@/store/todo';
import { TodoItem } from './TodoItem';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { ImageUpload } from './ImageUpload';

export function TodoList() {
  const [newTodo, setNewTodo] = useState('');
  const [newImageUrl, setNewImageUrl] = useState<string>();
  const { todos, addTodo } = useTodoStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo.trim(), newImageUrl);
      setNewTodo('');
      setNewImageUrl(undefined);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center text-foreground">ToDo App</h1>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="新しいタスクを入力..."
          className="flex-1 rounded-md bg-background px-3 py-2 border"
        />
        <ImageUpload
          imageUrl={newImageUrl}
          onImageUpload={(url) => setNewImageUrl(url)}
          onImageRemove={() => setNewImageUrl(undefined)}
        />
        <Button type="submit">
          <Plus className="h-4 w-4 mr-2" />
          追加
        </Button>
      </form>
      <div className="space-y-2">
        {todos.length === 0 ? (
          <p className="text-center text-muted-foreground">
            タスクがありません
          </p>
        ) : (
          todos
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .map((todo) => <TodoItem key={todo.id} todo={todo} />)
        )}
      </div>
    </div>
  );
} 