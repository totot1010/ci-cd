import React, { useState, useEffect } from "react";
import type { Todo, TodoInput } from "../types/todo";

interface TodoFormProps {
  todo?: Todo | null;
  onSubmit: (todo: TodoInput) => void;
  onCancel: () => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({
  todo,
  onSubmit,
  onCancel,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [todo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit({
        title: title.trim(),
        description: description.trim(),
      });
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <h2>{todo ? "Todoを編集" : "新しいTodoを追加"}</h2>
      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトル"
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="説明（任意）"
          className="form-textarea"
          rows={3}
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {todo ? "更新" : "追加"}
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary">
          キャンセル
        </button>
      </div>
    </form>
  );
};
