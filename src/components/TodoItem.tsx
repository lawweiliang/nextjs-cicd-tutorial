import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.01, y: -2 }}
    >
      <Card className={cn(
        "mb-3 overflow-hidden shadow-sm transition-all duration-300 rounded-xl",
        "bg-white border border-border/60 hover:shadow-md",
        todo.completed ? "opacity-85" : "opacity-100"
      )}>
        <div className="flex items-center p-4 relative overflow-hidden">
          {/* Subtle background indicator */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary/60 rounded-l-xl opacity-80"></div>
          
          <div className="flex items-center flex-1 z-10 ml-2">
            <div 
              className={cn(
                "cursor-pointer transition-all duration-300 text-base", 
                todo.completed ? "text-muted-foreground line-through" : "text-foreground font-medium"
              )}
              onClick={() => onToggle(todo.id, !todo.completed)}
            >
              {todo.title}
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onDelete(todo.id)}
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors duration-300 rounded-full z-10 p-2 h-8 w-8 flex items-center justify-center ml-2"
              aria-label="Delete todo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18"/>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
              </svg>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default TodoItem;