import { useTodoStore } from '@/store/todo';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { ImageUpload } from './ImageUpload';
import { TodoItem } from './TodoItem';
import { Button } from './ui/button';

export function TodoList() {
  const [newTodo, setNewTodo] = useState('');
  const [newImageUrl, setNewImageUrl] = useState<string>();
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo, uploadImage, removeImage } =
    useTodoStore();

  const handleImageUpload = async (file: File) => {
    // TODO: 実際のアップロード処理を実装する
    // 一時的にDataURLとして扱う
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

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
          onImageUpload={handleImageUpload}
          onImageRemove={() => setNewImageUrl(undefined)}
        />
        <Button type="submit">
          <Plus className="h-4 w-4 mr-2" />
          追加
        </Button>
      </form>
      <div className="space-y-2">
        {todos.length === 0 ? (
          <p className="text-center text-muted-foreground">タスクがありません</p>
        ) : (
          todos
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
                onImageUpload={(id, file) => {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    uploadImage(id, reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }}
                onImageRemove={removeImage}
              />
            ))
        )}
      </div>
    </div>
  );
}
