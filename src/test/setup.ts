import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// RTLのマッチャーを拡張
expect.extend(matchers as any);

// モックの設定
vi.mock('@/store/todo', () => ({
  useTodoStore: () => ({
    todos: [],
    addTodo: vi.fn(),
    deleteTodo: vi.fn(),
    toggleTodo: vi.fn(),
    editTodo: vi.fn(),
  }),
}));

vi.mock('@/lib/utils', () => ({
  cn: (...inputs: any[]) => inputs.join(' '),
}));

// 各テスト後にクリーンアップ
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
}); 