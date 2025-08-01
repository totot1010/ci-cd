import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoItem } from '../TodoItem';
import type { Todo } from '../../types/todo';

const mockTodo: Todo = {
  id: 1,
  title: 'Test Todo',
  description: 'Test description',
  completed: false,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

const mockHandlers = {
  onToggle: jest.fn(),
  onDelete: jest.fn(),
  onEdit: jest.fn(),
};

describe('TodoItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders todo information', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  test('renders checkbox with correct state', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  test('renders checkbox as checked when todo is completed', () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(<TodoItem todo={completedTodo} {...mockHandlers} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  test('calls onToggle when checkbox is clicked', async () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);
    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);
    expect(mockHandlers.onToggle).toHaveBeenCalledWith(1);
  });

  test('calls onEdit when edit button is clicked', async () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);
    const editButton = screen.getByText('編集');
    await userEvent.click(editButton);
    expect(mockHandlers.onEdit).toHaveBeenCalledWith(1);
  });

  test('calls onDelete when delete button is clicked', async () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);
    const deleteButton = screen.getByText('削除');
    await userEvent.click(deleteButton);
    expect(mockHandlers.onDelete).toHaveBeenCalledWith(1);
  });

  test('applies completed class when todo is completed', () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(<TodoItem todo={completedTodo} {...mockHandlers} />);
    const todoText = screen.getByText('Test Todo').parentElement;
    expect(todoText).toHaveClass('completed');
  });

  test('does not render description when not provided', () => {
    const todoWithoutDescription = { ...mockTodo, description: '' };
    render(<TodoItem todo={todoWithoutDescription} {...mockHandlers} />);
    expect(screen.queryByText('Test description')).not.toBeInTheDocument();
  });
});
