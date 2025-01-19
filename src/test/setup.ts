import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare module 'vitest' {
  interface Assertion<T> extends TestingLibraryMatchers<typeof expect.stringContaining, T> {
    toBeInTheDocument(): void;
    toHaveBeenCalledWith(arg: unknown): void;
  }
}

// RTLのマッチャーを拡張
expect.extend(matchers);

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
  cn: (...inputs: (string | undefined)[]) => inputs.filter(Boolean).join(' '),
}));

// canvas-confettiのモック
vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

// 各テスト後にクリーンアップ
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
}); 