import type { Todo, TodoInput } from '../types/todo';

export const todoApi = {
  getAll: jest.fn<Promise<Todo[]>, []>(),
  get: jest.fn<Promise<Todo>, [number]>(),
  create: jest.fn<Promise<Todo>, [TodoInput]>(),
  update: jest.fn<Promise<Todo>, [number, Partial<TodoInput>]>(),
  delete: jest.fn<Promise<void>, [number]>(),
};
