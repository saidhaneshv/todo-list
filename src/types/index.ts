export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
}

export interface TodoFilters {
  all: Todo[];
  active: Todo[];
  completed: Todo[];
}
