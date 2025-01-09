import React from 'react';
import { Loader2, Trash2 } from 'lucide-react';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onDelete: (id: string) => void;
  onToggle: (id: string, completed: boolean) => void;
}

export function TaskList({ tasks, loading, onDelete, onToggle }: TaskListProps) {
  if (loading) {
    return (
      <div className="flex justify-center p-4">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(e) => onToggle(task.id, e.target.checked)}
              className="h-5 w-5 rounded border-gray-300"
            />
            <span className={task.completed ? 'line-through text-gray-500' : ''}>
              {task.title}
            </span>
          </div>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
        </li>
      ))}
    </ul>
  );
}