import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AddTodoFormProps {
  onAddTodo: (title: string) => Promise<void>;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAddTodo }) => {
  const [newTodo, setNewTodo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onAddTodo(newTodo);
      setNewTodo('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-8">
      <div className="relative flex-1 flex items-center">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          className="h-11 px-4 shadow-none transition-all duration-300 rounded-l-xl rounded-r-none border-border focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-0 focus-visible:border-primary/50"
          disabled={isSubmitting}
        />
        <Button 
          type="submit" 
          disabled={isSubmitting || !newTodo.trim()}
          className="h-11 font-medium transition-all duration-300 bg-primary hover:bg-primary/90 rounded-l-none rounded-r-xl"
          aria-label="Add todo"
        >
          {isSubmitting ? 'Adding...' : 'Add'}
        </Button>
      </div>
    </form>
  );
};

export default AddTodoForm;