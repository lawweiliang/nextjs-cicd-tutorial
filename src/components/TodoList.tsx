import React from 'react';
import TodoItem from '@/components/TodoItem';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

interface TodoListProps {
  todos: Todo[];
  isLoading: boolean;
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ 
  todos, 
  isLoading, 
  onToggle, 
  onDelete 
}) => {
  if (isLoading) {
    return (
      <div className="text-center py-10 px-6 rounded-xl bg-white shadow-sm border border-border/40">
        <div className="flex flex-col items-center gap-3">
          <div className="h-5 w-5 rounded-full border-2 border-primary/40 border-t-transparent animate-spin"></div>
          <p className="text-primary/70 font-medium text-sm">Loading todos...</p>
        </div>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-10 px-6 rounded-xl bg-white shadow-sm border border-border/30 flex flex-col items-center gap-4 transition-all duration-300">
        <div className="p-3 rounded-full bg-accent opacity-80">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary/70">
            <path d="M11 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5"></path>
            <path d="M18 14v4"></path>
            <path d="M18 22v.01"></path>
          </svg>
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-medium text-foreground">No todos yet</h3>
          <p className="text-muted-foreground text-sm">Create your first task above</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 py-2">
      {todos.map((todo, index) => (
        <div 
          className="animate-slideIn transform transition-all duration-300" 
          style={{ animationDelay: `${index * 50}ms` }} 
          key={todo.id}
        >
          <TodoItem
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
};

export default TodoList;