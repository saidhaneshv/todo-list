import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { Todo } from '../types';

interface TodoStore {
  todos: Todo[];
  addTodo: (title: string, description?: string) => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  updateTodo: (id: string, title: string, description?: string) => void;
  getTodos: () => Todo[];
  getActiveTodos: () => Todo[];
  getCompletedTodos: () => Todo[];
  clearCompleted: () => void;
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],

  addTodo: (title: string, description?: string) => {
    const newTodo: Todo = {
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

  removeTodo: (id: string) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },

  toggleTodo: (id: string) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  },

  updateTodo: (id: string, title: string, description?: string) => {
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
