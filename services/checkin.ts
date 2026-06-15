import type { CheckinRecord, ReminderTaskType } from '../models/reminder';
import type { DailyStats } from '../models/stats';
import { getMockDailyStats } from './mock';

export async function createCheckin(taskType: ReminderTaskType): Promise<CheckinRecord> {
  return {
    id: `${taskType}-${Date.now()}`,
    taskType,
    checkedAt: new Date().toISOString(),
    source: 'manual'
  };
}

export async function getTodayStats(): Promise<DailyStats> {
  return getMockDailyStats();
}
