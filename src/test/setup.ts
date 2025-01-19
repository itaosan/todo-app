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
  default: vi.fn(() => Promise.resolve())
}));

// グローバルなcanvasモックの設定
const createContext2DMock = () => ({
  canvas: {
    width: 100,
    height: 100,
  },
  fillStyle: '',
  fillRect: vi.fn(),
  clearRect: vi.fn(),
  getImageData: vi.fn(() => ({ data: new Uint8Array() })),
  putImageData: vi.fn(),
  createImageData: vi.fn(),
  setTransform: vi.fn(),
  drawImage: vi.fn(),
  save: vi.fn(),
  restore: vi.fn(),
  scale: vi.fn(),
  rotate: vi.fn(),
  translate: vi.fn(),
  transform: vi.fn(),
  globalCompositeOperation: '',
  globalAlpha: 1,
});

class CanvasMock {
  getContext(contextId: string) {
    if (contextId === '2d') {
      return createContext2DMock();
    }
    return null;
  }
}

vi.stubGlobal('HTMLCanvasElement', CanvasMock);

// 各テスト後にクリーンアップ
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
}); 