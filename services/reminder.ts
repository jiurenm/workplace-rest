import type { ReminderTask, ReminderTaskType } from '../models/reminder';
import { DEFAULT_SETTINGS } from '../models/settings';
import { addMinutes } from '../utils/time';

const TASK_COPY: Record<ReminderTaskType, Pick<ReminderTask, 'title' | 'description' | 'dailyTarget'>> = {
  water: {
    title: '喝水',
    description: '喝口水吧，身体也需要补充能量。',
    dailyTarget: 8
  },
  eye: {
    title: '护眼',
    description: '望向远方 20 秒，让眼睛休息一下。',
    dailyTarget: 6
  },
  stand: {
    title: '站立',
    description: '起身活动一下，放松肩颈和腰背。',
    dailyTarget: 6
  },
  toilet: {
    title: '如厕',
    description: '工作再忙，也别让膀胱加班。',
    dailyTarget: 5
  },
  brush: {
    title: '刷牙',
    description: '用巴氏刷牙法认真清洁 2 分钟。',
    dailyTarget: 2
  }
};

export async function getReminderTasks(): Promise<ReminderTask[]> {
  const now = new Date();

  return DEFAULT_SETTINGS.reminderPreferences.map((preference) => ({
    id: preference.taskType,
    title: TASK_COPY[preference.taskType].title,
    description: TASK_COPY[preference.taskType].description,
    intervalMinutes: preference.intervalMinutes,
    dailyTarget: TASK_COPY[preference.taskType].dailyTarget,
    status: preference.enabled ? 'active' : 'disabled',
    nextReminderAt: addMinutes(now, preference.intervalMinutes).toISOString()
  }));
}

export async function pauseAllReminders(): Promise<void> {
  return Promise.resolve();
}

export async function resumeAllReminders(): Promise<void> {
  return Promise.resolve();
}
