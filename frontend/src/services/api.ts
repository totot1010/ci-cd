import axios from 'axios';
import type { Todo, TodoInput } from '../types/todo';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const todoApi = {
  getAll: async (): Promise<Todo[]> => {
    const response = await api.get<PaginatedResponse<Todo>>('/todos/');
    return response.data.results;
  },

  get: async (id: number): Promise<Todo> => {
    const response = await api.get<Todo>(`/todos/${id}/`);
    return response.data;
  },

  create: async (todo: TodoInput): Promise<Todo> => {
    const response = await api.post<Todo>('/todos/', todo);
    return response.data;
  },

  update: async (id: number, todo: Partial<TodoInput>): Promise<Todo> => {
    const response = await api.patch<Todo>(`/todos/${id}/`, todo);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/todos/${id}/`);
  },
};
