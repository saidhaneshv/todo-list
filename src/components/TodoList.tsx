import { useState } from 'react';
import { useTodoStore } from '../store/todoStore';
import { TodoItem } from './TodoItem';
import { TodoInput } from './TodoInput';
import '../styles/TodoList.css';

export const TodoList = () => {
  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const clearCompleted = useTodoStore((state) => state.clearCompleted);

  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos();
  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="todo-container">
      <div className="todo-wrapper">
        <h1>📝 My Todo List</h1>
        <TodoInput onAdd={addTodo} />

        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({todos.length})
          </button>
          <button
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active ({activeTodos.length})
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed ({completedTodos.length})
          </button>
        </div>

        <div className="todo-list">
          {filteredTodos.length === 0 ? (
            <p className="empty-state">
              {filter === 'all' && "No todos yet. Add one to get started!"}
              {filter === 'active' && "No active todos. Great job!"}
              {filter === 'completed' && "No completed todos yet."}
            </p>
          ) : (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={removeTodo}
                onUpdate={updateTodo}
              />
            ))
          )}
        </div>

        {completedTodos.length > 0 && (
          <button className="clear-completed-btn" onClick={clearCompleted}>
            Clear Completed
          </button>
        )}
      </div>
    </div>
  );
};
