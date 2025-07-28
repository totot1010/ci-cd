import { useState, useEffect } from 'react';
import './App.css';
import type { Todo, TodoInput } from './types/todo';
import { todoApi } from './services/api';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await todoApi.getAll();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Todoの取得に失敗しました');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (todoInput: TodoInput) => {
    try {
      const newTodo = await todoApi.create(todoInput);
      setTodos([newTodo, ...todos]);
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError('Todoの作成に失敗しました');
      console.error(err);
    }
  };

  const handleUpdate = async (todoInput: TodoInput) => {
    if (!editingTodo) return;

    try {
      const updatedTodo = await todoApi.update(editingTodo.id, todoInput);
      setTodos(
        todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      );
      setEditingTodo(null);
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError('Todoの更新に失敗しました');
      console.error(err);
    }
  };

  const handleToggle = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      const updatedTodo = await todoApi.update(id, {
        completed: !todo.completed,
      });
      setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
      setError(null);
    } catch (err) {
      setError('Todoの更新に失敗しました');
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('このTodoを削除しますか？')) return;

    try {
      await todoApi.delete(id);
      setTodos(todos.filter((todo) => todo.id !== id));
      setError(null);
    } catch (err) {
      setError('Todoの削除に失敗しました');
      console.error(err);
    }
  };

  const handleEdit = (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      setEditingTodo(todo);
      setShowForm(true);
    }
  };

  const handleCancel = () => {
    setEditingTodo(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Todo アプリケーション</h1>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          新しいTodoを追加
        </button>
      </header>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <TodoForm
              todo={editingTodo}
              onSubmit={editingTodo ? handleUpdate : handleCreate}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}

      <main className="app-main">
        <TodoList
          todos={todos}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </main>
    </div>
  );
}

export default App;
