import { useState } from 'react';
import '../styles/TodoItem.css';

export const TodoItem = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(todo.id, editTitle, editDescription);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <input
          className="edit-input"
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="Todo title"
          autoFocus
        />
        <input
          className="edit-input"
          type="text"
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          placeholder="Description (optional)"
        />
        <button className="save-btn" onClick={handleSave}>Save</button>
        <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="todo-checkbox"
      />
      <div className="todo-content">
        <h3 className="todo-title">{todo.title}</h3>
        {todo.description && <p className="todo-description">{todo.description}</p>}
      </div>
      <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
      <button className="delete-btn" onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
};
