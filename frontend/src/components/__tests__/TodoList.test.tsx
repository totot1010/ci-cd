import { render, screen } from '@testing-library/react';
import { TodoList } from '../TodoList';
import type { Todo } from '../../types/todo';

const mockTodos: Todo[] = [
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

const mockHandlers = {
  onToggle: jest.fn(),
  onDelete: jest.fn(),
  onEdit: jest.fn(),
};

describe('TodoList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders empty message when no todos', () => {
    render(<TodoList todos={[]} {...mockHandlers} />);
    expect(
      screen.getByText('Todoがありません。新しいTodoを追加してください。')
    ).toBeInTheDocument();
  });

  test('renders all todos', () => {
    render(<TodoList todos={mockTodos} {...mockHandlers} />);
    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
    expect(screen.getByText('Test description 1')).toBeInTheDocument();
    expect(screen.getByText('Test description 2')).toBeInTheDocument();
  });

  test('renders correct number of TodoItem components', () => {
    render(<TodoList todos={mockTodos} {...mockHandlers} />);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(2);
  });

  test('passes correct props to TodoItem components', () => {
    render(<TodoList todos={mockTodos} {...mockHandlers} />);

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).toBeChecked();
  });
});
