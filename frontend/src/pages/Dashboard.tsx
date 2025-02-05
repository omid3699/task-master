import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format, addDays, startOfDay, endOfWeek, setHours, setMinutes } from 'date-fns';
import { toast } from 'react-hot-toast';
import { Plus, Calendar, Clock, CheckCircle, XCircle, Trash2, CalendarClock } from 'lucide-react';
import { tasks } from '../lib/api';
import type { Task, TaskStatus } from '../types/api';

function TaskCard({ task, onDelete }: { task: Task; onDelete: () => void }) {
  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: TaskStatus }) =>
      tasks.update(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task updated successfully');
    },
  });

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
        <button
          onClick={onDelete}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
      {task.description && (
        <p className="text-gray-500">{task.description}</p>
      )}
      <div className="flex items-center space-x-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
          {task.status.replace('_', ' ')}
        </span>
        <div className="flex items-center text-gray-500 text-sm">
          <Calendar className="h-4 w-4 mr-1" />
          {format(new Date(task.due_date), 'MMM d, yyyy')}
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => updateMutation.mutate({ id: task.id, status: 'in_progress' })}
          disabled={task.status === 'in_progress'}
          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Clock className="h-4 w-4 mr-1" />
          Start
        </button>
        <button
          onClick={() => updateMutation.mutate({ id: task.id, status: 'completed' })}
          disabled={task.status === 'completed'}
          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <CheckCircle className="h-4 w-4 mr-1" />
          Complete
        </button>
      </div>
    </div>
  );
}

interface QuickDateOption {
  label: string;
  value: Date;
  icon: React.ReactNode;
}

function CreateTaskModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [showCustomDate, setShowCustomDate] = useState(false);

  const today = startOfDay(new Date());
  const endOfToday = setMinutes(setHours(today, 23), 59);
  const tomorrow = addDays(today, 1);
  const endOfTomorrow = setMinutes(setHours(tomorrow, 23), 59);
  const weekend = endOfWeek(today);

  const quickDateOptions: QuickDateOption[] = [
    {
      label: 'End of Today',
      value: endOfToday,
      icon: <Clock className="h-4 w-4" />,
    },
    {
      label: 'Tomorrow',
      value: endOfTomorrow,
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      label: 'This Weekend',
      value: weekend,
      icon: <CalendarClock className="h-4 w-4" />,
    },
    {
      label: 'Next Week',
      value: addDays(today, 7),
      icon: <Calendar className="h-4 w-4" />,
    },
  ];

  const createMutation = useMutation({
    mutationFn: (newTask: CreateTaskInput) => tasks.create(newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task created successfully');
      onClose();
    },
  });

  const handleQuickDateSelect = (date: Date) => {
    setDueDate(date.toISOString().slice(0, 16));
    setShowCustomDate(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({
      title,
      description,
      status: 'pending',
      due_date: new Date(dueDate).toISOString(),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Create New Task</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <XCircle className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="What needs to be done?"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Add some details..."
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Due Date
            </label>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {quickDateOptions.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => handleQuickDateSelect(option.value)}
                  className="inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {option.icon}
                  <span className="ml-2">{option.label}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowCustomDate(!showCustomDate)}
              className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
            >
              {showCustomDate ? 'Hide custom date' : 'Choose custom date and time'}
            </button>
            {showCustomDate && (
              <input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-2 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            )}
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Dashboard() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: taskList = [], isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: tasks.getAll,
  });

  const deleteMutation = useMutation({
    mutationFn: tasks.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task deleted successfully');
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {taskList.map((task: Task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={() => deleteMutation.mutate(task.id)}
          />
        ))}
      </div>

      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}

export default Dashboard;