import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export const useTodoStore = create((set, get) => ({
  todos: [],

  addTodo: (title, description) => {
    const newTodo = {
      id: uuidv4(),
      title,
      description,
      completed: false,
      createdAt: new Date(),
    };
    set((state) => ({
      todos: [...state.todos, newTodo],
    }));
  },

  removeTodo: (id) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },

  toggleTodo: (id) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  },

  updateTodo: (id, title, description) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, title, description } : todo
      ),
    }));
  },

  getTodos: () => get().todos,

  getActiveTodos: () => get().todos.filter((todo) => !todo.completed),

  getCompletedTodos: () => get().todos.filter((todo) => todo.completed),

  clearCompleted: () => {
    set((state) => ({
      todos: state.todos.filter((todo) => !todo.completed),
    }));
  },
}));
