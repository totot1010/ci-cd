import type { Todo, TodoInput } from '../../types/todo';

// Create a mock axios instance
const mockGet = jest.fn();
const mockPost = jest.fn();
const mockPatch = jest.fn();
const mockDelete = jest.fn();

const mockAxiosInstance = {
  get: mockGet,
  post: mockPost,
  patch: mockPatch,
  delete: mockDelete,
};

// Mock axios module
jest.mock('axios', () => ({
  create: jest.fn(() => mockAxiosInstance),
}));

// Import after mocking
import { todoApi } from '../api';

describe('todoApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    test('fetches todos successfully', async () => {
      const mockTodos: Todo[] = [
        {
          id: 1,
          title: 'Test Todo',
          description: 'Test description',
          completed: false,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      ];

      mockGet.mockResolvedValue({
        data: {
          count: 1,
          next: null,
          previous: null,
          results: mockTodos,
        },
      });

      const result = await todoApi.getAll();

      expect(mockGet).toHaveBeenCalledWith('/todos/');
      expect(result).toEqual(mockTodos);
    });
  });

  describe('get', () => {
    test('fetches single todo successfully', async () => {
      const mockTodo: Todo = {
        id: 1,
        title: 'Test Todo',
        description: 'Test description',
        completed: false,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      mockGet.mockResolvedValue({ data: mockTodo });

      const result = await todoApi.get(1);

      expect(mockGet).toHaveBeenCalledWith('/todos/1/');
      expect(result).toEqual(mockTodo);
    });
  });

  describe('create', () => {
    test('creates todo successfully', async () => {
      const todoInput: TodoInput = {
        title: 'New Todo',
        description: 'New description',
        completed: false,
      };

      const mockTodo: Todo = {
        id: 1,
        title: todoInput.title,
        description: todoInput.description,
        completed: todoInput.completed || false,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      mockPost.mockResolvedValue({ data: mockTodo });

      const result = await todoApi.create(todoInput);

      expect(mockPost).toHaveBeenCalledWith('/todos/', todoInput);
      expect(result).toEqual(mockTodo);
    });
  });

  describe('update', () => {
    test('updates todo successfully', async () => {
      const partialUpdate: Partial<TodoInput> = {
        completed: true,
      };

      const mockTodo: Todo = {
        id: 1,
        title: 'Test Todo',
        description: 'Test description',
        completed: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      mockPatch.mockResolvedValue({ data: mockTodo });

      const result = await todoApi.update(1, partialUpdate);

      expect(mockPatch).toHaveBeenCalledWith('/todos/1/', partialUpdate);
      expect(result).toEqual(mockTodo);
    });
  });

  describe('delete', () => {
    test('deletes todo successfully', async () => {
      mockDelete.mockResolvedValue({ data: null });

      await todoApi.delete(1);

      expect(mockDelete).toHaveBeenCalledWith('/todos/1/');
    });
  });
});
