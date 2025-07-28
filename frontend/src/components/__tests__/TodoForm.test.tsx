import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoForm } from '../TodoForm';
import type { Todo } from '../../types/todo';

const mockHandlers = {
  onSubmit: jest.fn(),
  onCancel: jest.fn(),
};

const mockTodo: Todo = {
  id: 1,
  title: 'Existing Todo',
  description: 'Existing description',
  completed: false,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

describe('TodoForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders create form when no todo is provided', () => {
    render(<TodoForm {...mockHandlers} />);
    expect(screen.getByText('新しいTodoを追加')).toBeInTheDocument();
    expect(screen.getByText('追加')).toBeInTheDocument();
  });

  test('renders edit form when todo is provided', () => {
    render(<TodoForm todo={mockTodo} {...mockHandlers} />);
    expect(screen.getByText('Todoを編集')).toBeInTheDocument();
    expect(screen.getByText('更新')).toBeInTheDocument();
  });

  test('fills form with todo data when editing', () => {
    render(<TodoForm todo={mockTodo} {...mockHandlers} />);
    const titleInput = screen.getByPlaceholderText('タイトル');
    const descriptionInput = screen.getByPlaceholderText('説明（任意）');

    expect(titleInput).toHaveValue('Existing Todo');
    expect(descriptionInput).toHaveValue('Existing description');
  });

  test('submits form with new data', async () => {
    render(<TodoForm {...mockHandlers} />);

    const titleInput = screen.getByPlaceholderText('タイトル');
    const descriptionInput = screen.getByPlaceholderText('説明（任意）');
    const submitButton = screen.getByText('追加');

    await userEvent.type(titleInput, 'New Todo');
    await userEvent.type(descriptionInput, 'New description');
    await userEvent.click(submitButton);

    expect(mockHandlers.onSubmit).toHaveBeenCalledWith({
      title: 'New Todo',
      description: 'New description',
    });
  });

  test('trims whitespace from input values', async () => {
    render(<TodoForm {...mockHandlers} />);

    const titleInput = screen.getByPlaceholderText('タイトル');
    const descriptionInput = screen.getByPlaceholderText('説明（任意）');
    const submitButton = screen.getByText('追加');

    await userEvent.type(titleInput, '  Trimmed Title  ');
    await userEvent.type(descriptionInput, '  Trimmed Description  ');
    await userEvent.click(submitButton);

    expect(mockHandlers.onSubmit).toHaveBeenCalledWith({
      title: 'Trimmed Title',
      description: 'Trimmed Description',
    });
  });

  test('does not submit form with empty title', async () => {
    render(<TodoForm {...mockHandlers} />);

    const descriptionInput = screen.getByPlaceholderText('説明（任意）');
    const submitButton = screen.getByText('追加');

    await userEvent.type(descriptionInput, 'Description only');
    await userEvent.click(submitButton);

    expect(mockHandlers.onSubmit).not.toHaveBeenCalled();
  });

  test('calls onCancel when cancel button is clicked', async () => {
    render(<TodoForm {...mockHandlers} />);

    const cancelButton = screen.getByText('キャンセル');
    await userEvent.click(cancelButton);

    expect(mockHandlers.onCancel).toHaveBeenCalled();
  });

  test('clears form after successful submission', async () => {
    render(<TodoForm {...mockHandlers} />);

    const titleInput = screen.getByPlaceholderText('タイトル');
    const descriptionInput = screen.getByPlaceholderText('説明（任意）');
    const submitButton = screen.getByText('追加');

    await userEvent.type(titleInput, 'New Todo');
    await userEvent.type(descriptionInput, 'New description');
    await userEvent.click(submitButton);

    expect(titleInput).toHaveValue('');
    expect(descriptionInput).toHaveValue('');
  });

  test('updates form when todo prop changes', () => {
    const { rerender } = render(<TodoForm {...mockHandlers} />);

    const titleInput = screen.getByPlaceholderText('タイトル');
    const descriptionInput = screen.getByPlaceholderText('説明（任意）');

    expect(titleInput).toHaveValue('');
    expect(descriptionInput).toHaveValue('');

    rerender(<TodoForm todo={mockTodo} {...mockHandlers} />);

    expect(titleInput).toHaveValue('Existing Todo');
    expect(descriptionInput).toHaveValue('Existing description');
  });
});
