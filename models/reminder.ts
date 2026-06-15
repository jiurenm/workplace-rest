export type ReminderTaskType = 'water' | 'eye' | 'stand' | 'toilet' | 'brush';

export type ReminderStatus = 'active' | 'paused' | 'disabled';

export interface ReminderTask {
  id: ReminderTaskType;
  title: string;
  description: string;
  intervalMinutes: number;
  dailyTarget: number;
  status: ReminderStatus;
  nextReminderAt?: string;
}

export interface CheckinRecord {
  id: string;
  taskType: ReminderTaskType;
  checkedAt: string;
  source: 'manual' | 'reminder';
}

export const MVP_TASKS: ReminderTaskType[] = ['water', 'eye', 'stand'];
