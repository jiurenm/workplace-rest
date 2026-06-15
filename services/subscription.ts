import type { ReminderTaskType } from '../models/reminder';
import { callCloudFunction } from './cloud';

const TEMPLATE_IDS: Partial<Record<ReminderTaskType, string>> = {};

export async function requestReminderSubscription(taskType: ReminderTaskType): Promise<WechatMiniprogram.RequestSubscribeMessageSuccessCallbackResult> {
  const templateId = TEMPLATE_IDS[taskType];

  if (!templateId) {
    throw new Error(`缺少 ${taskType} 的订阅消息模板 ID`);
  }

  return wx.requestSubscribeMessage({
    tmplIds: [templateId]
  });
}

export async function enqueueReminder(taskType: ReminderTaskType): Promise<void> {
  await callCloudFunction<{ taskType: ReminderTaskType }, { ok: boolean }>('sendReminder', {
    taskType
  });
}
