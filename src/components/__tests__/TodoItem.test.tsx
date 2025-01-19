import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from '../TodoItem';

describe('TodoItem', () => {
  const mockTodo = {
    id: '1',
    title: 'テストタスク',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const mockHandlers = {
    onToggle: vi.fn(),
    onDelete: vi.fn(),
    onEdit: vi.fn(),
  };

  it('タスクのタイトルが正しく表示される', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockHandlers.onToggle}
        onDelete={mockHandlers.onDelete}
        onEdit={mockHandlers.onEdit}
      />
    );

    expect(screen.getByText('テストタスク')).toBeInTheDocument();
  });

  it('完了状態の切り替えが機能する', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockHandlers.onToggle}
        onDelete={mockHandlers.onDelete}
        onEdit={mockHandlers.onEdit}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockHandlers.onToggle).toHaveBeenCalledWith(mockTodo.id);
  });

  it('削除ボタンが機能する', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockHandlers.onToggle}
        onDelete={mockHandlers.onDelete}
        onEdit={mockHandlers.onEdit}
      />
    );

    const deleteButton = screen.getByLabelText('タスクを削除');
    fireEvent.click(deleteButton);

    expect(mockHandlers.onDelete).toHaveBeenCalledWith(mockTodo.id);
  });
}); 