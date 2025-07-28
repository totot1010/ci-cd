import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { todoApi } from './services/api';

jest.mock('./services/api');

const mockTodos = [
  {
    id: 1,
    title: 'Test Todo 1',
    description: 'Test description 1',
    completed: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    title: 'Test Todo 2',
    description: 'Test description 2',
    completed: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
];

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    (todoApi.getAll as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );
    render(<App />);
    expect(screen.getByText('読み込み中...')).toBeInTheDocument();
  });

  test('renders todos after loading', async () => {
    (todoApi.getAll as jest.Mock).mockResolvedValue(mockTodos);
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Todo アプリケーション')).toBeInTheDocument();
      expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
      expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
    });
  });

  test('displays error when fetching todos fails', async () => {
    (todoApi.getAll as jest.Mock).mockRejectedValue(new Error('API Error'));
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Todoの取得に失敗しました')).toBeInTheDocument();
    });
  });

  test('opens form when add button is clicked', async () => {
    (todoApi.getAll as jest.Mock).mockResolvedValue(mockTodos);
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('新しいTodoを追加')).toBeInTheDocument();
    });

    const addButton = screen.getByText('新しいTodoを追加');
    await userEvent.click(addButton);

    expect(screen.getByPlaceholderText('タイトル')).toBeInTheDocument();
  });

  test('creates new todo', async () => {
    const newTodo = {
      id: 3,
      title: 'New Todo',
      description: 'New description',
      completed: false,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    };

    (todoApi.getAll as jest.Mock).mockResolvedValue(mockTodos);
    (todoApi.create as jest.Mock).mockResolvedValue(newTodo);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('新しいTodoを追加')).toBeInTheDocument();
    });

    const addButton = screen.getByText('新しいTodoを追加');
    await userEvent.click(addButton);

    const titleInput = screen.getByPlaceholderText('タイトル');
    const descriptionInput = screen.getByPlaceholderText('説明（任意）');
    const submitButton = screen.getByText('追加');

    await userEvent.type(titleInput, 'New Todo');
    await userEvent.type(descriptionInput, 'New description');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(todoApi.create).toHaveBeenCalledWith({
        title: 'New Todo',
        description: 'New description',
      });
    });
  });

  test('toggles todo completion status', async () => {
    const updatedTodo = { ...mockTodos[0], completed: true };
    (todoApi.getAll as jest.Mock).mockResolvedValue(mockTodos);
    (todoApi.update as jest.Mock).mockResolvedValue(updatedTodo);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    });

    const checkboxes = screen.getAllByRole('checkbox');
    await userEvent.click(checkboxes[0]);

    await waitFor(() => {
      expect(todoApi.update).toHaveBeenCalledWith(1, { completed: true });
    });
  });

  test('deletes todo with confirmation', async () => {
    window.confirm = jest.fn(() => true);
    (todoApi.getAll as jest.Mock).mockResolvedValue(mockTodos);
    (todoApi.delete as jest.Mock).mockResolvedValue(undefined);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByText('削除');
    await userEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(window.confirm).toHaveBeenCalledWith('このTodoを削除しますか？');
      expect(todoApi.delete).toHaveBeenCalledWith(1);
    });
  });
});
