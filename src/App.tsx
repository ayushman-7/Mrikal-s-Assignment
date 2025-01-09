import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { ClipboardList, LogOut } from 'lucide-react';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { Auth } from './components/Auth';
import { supabase } from './lib/supabase';
import { Task } from './types';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchTasks();
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchTasks();
    });
  }, []);

  async function fetchTasks() {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }

  async function addTask(title: string) {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([{ title, completed: false }])
        .select()
        .single();

      if (error) throw error;
      setTasks([data, ...tasks]);
      toast.success('Task added successfully');
    } catch (error) {
      toast.error('Failed to add task');
    }
  }

  async function deleteTask(id: string) {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setTasks(tasks.filter((task) => task.id !== id));
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  }

  async function toggleTask(id: string, completed: boolean) {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ completed })
        .eq('id', id);

      if (error) throw error;
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed } : task
        )
      );
    } catch (error) {
      toast.error('Failed to update task');
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    setTasks([]);
    setSession(null);
    toast.success('Signed out successfully');
  }

  if (!session) {
    return (
      <>
        <Auth onSignIn={() => setLoading(true)} />
        <Toaster position="bottom-right" />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ClipboardList className="h-8 w-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
        
        <div className="space-y-6">
          <TaskForm onSubmit={addTask} />
          <TaskList
            tasks={tasks}
            loading={loading}
            onDelete={deleteTask}
            onToggle={toggleTask}
          />
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;