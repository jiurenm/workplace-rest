import type { ReminderTaskType } from './reminder';

export interface TaskDailyStats {
  taskType: ReminderTaskType;
  completed: number;
  target: number;
  nextReminderAt?: string;
}

export interface DailyStats {
  date: string;
  tasks: TaskDailyStats[];
  streakDays: number;
}

export interface TrendPoint {
  date: string;
  water: number;
  eye: number;
  stand: number;
  toilet: number;
  brush: number;
}
