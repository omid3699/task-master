export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignupCredentials {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
}

export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  due_date: string;
  created_at: string;
  updated_at: string;
  is_overdue: boolean;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  status: TaskStatus;
  due_date: string;
}