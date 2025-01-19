import { create } from 'zustand';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  imageUrl?: string;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (title: string, imageUrl?: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, title: string, imageUrl?: string) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  addTodo: (title, imageUrl) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: crypto.randomUUID(),
          title,
          completed: false,
          createdAt: new Date(),
          imageUrl,
        },
      ],
    })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  editTodo: (id, title, imageUrl) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, title, imageUrl: imageUrl ?? todo.imageUrl } : todo
      ),
    })),
})); 