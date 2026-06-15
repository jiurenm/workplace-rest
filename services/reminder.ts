import type { ReminderTask } from '../models/reminder';
import { getMockReminderTasks } from './mock';

export async function getReminderTasks(): Promise<ReminderTask[]> {
  return getMockReminderTasks();
}

export async function pauseAllReminders(): Promise<void> {
  return Promise.resolve();
}

export async function resumeAllReminders(): Promise<void> {
  return Promise.resolve();
}
