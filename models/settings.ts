import type { ReminderTaskType } from './reminder';

export interface TimeRange {
  start: string;
  end: string;
}

export interface ReminderPreference {
  taskType: ReminderTaskType;
  enabled: boolean;
  intervalMinutes: number;
}

export interface UserSettings {
  workTime: TimeRange;
  focusTimes: TimeRange[];
  reminderPreferences: ReminderPreference[];
  sound: 'default' | 'nature' | 'bell' | 'silent';
  vibration: 'off' | 'light' | 'strong';
}

export const DEFAULT_SETTINGS: UserSettings = {
  workTime: {
    start: '09:00',
    end: '18:00'
  },
  focusTimes: [],
  reminderPreferences: [
    { taskType: 'water', enabled: true, intervalMinutes: 45 },
    { taskType: 'eye', enabled: true, intervalMinutes: 20 },
    { taskType: 'stand', enabled: true, intervalMinutes: 60 },
    { taskType: 'toilet', enabled: false, intervalMinutes: 120 },
    { taskType: 'brush', enabled: false, intervalMinutes: 720 }
  ],
  sound: 'default',
  vibration: 'light'
};
