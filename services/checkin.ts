import type { CheckinRecord, ReminderTaskType } from '../models/reminder';
import type { DailyStats } from '../models/stats';
import { formatDate } from '../utils/time';

export async function createCheckin(taskType: ReminderTaskType): Promise<CheckinRecord> {
  return {
    id: `${taskType}-${Date.now()}`,
    taskType,
    checkedAt: new Date().toISOString(),
    source: 'manual'
  };
}

export async function getTodayStats(): Promise<DailyStats> {
  return {
    date: formatDate(new Date()),
    streakDays: 0,
    tasks: [
      { taskType: 'water', completed: 0, target: 8 },
      { taskType: 'eye', completed: 0, target: 6 },
      { taskType: 'stand', completed: 0, target: 6 }
    ]
  };
}
