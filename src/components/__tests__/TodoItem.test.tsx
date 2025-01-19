import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoItem } from '../TodoItem';
import { useTodoStore } from '@/store/todo';

// モックの設定
vi.mock('@/store/todo');

describe('TodoItem', () => {
  const mockTodo = {
    id: '1',
    title: 'テストタスク',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // 各テストの前にモックをリセット
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('タスクのタイトルが正しく表示される', () => {
    // モックの実装
    vi.mocked(useTodoStore).mockReturnValue({
      todos: [],
      addTodo: vi.fn(),
      deleteTodo: vi.fn(),
      toggleTodo: vi.fn(),
      editTodo: vi.fn(),
    });

    render(<TodoItem todo={mockTodo} />);
    expect(screen.getByText('テストタスク')).toBeInTheDocument();
  });

  it('完了状態の切り替えが機能する', () => {
    const toggleTodo = vi.fn();
    
    // モックの実装
    vi.mocked(useTodoStore).mockReturnValue({
      todos: [],
      addTodo: vi.fn(),
      deleteTodo: vi.fn(),
      toggleTodo,
      editTodo: vi.fn(),
    });

    render(<TodoItem todo={mockTodo} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(toggleTodo).toHaveBeenCalledWith(mockTodo.id);
  });

  it('削除ボタンが機能する', () => {
    const deleteTodo = vi.fn();
    
    // モックの実装
    vi.mocked(useTodoStore).mockReturnValue({
      todos: [],
      addTodo: vi.fn(),
      deleteTodo,
      toggleTodo: vi.fn(),
      editTodo: vi.fn(),
    });

    render(<TodoItem todo={mockTodo} />);
    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);

    expect(deleteTodo).toHaveBeenCalledWith(mockTodo.id);
  });
}); 