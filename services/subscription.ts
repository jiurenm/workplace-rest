import type { ReminderTaskType } from '../models/reminder';
import { callCloudFunction } from './cloud';

const TEMPLATE_IDS: Partial<Record<ReminderTaskType, string>> = {};

export interface SubscriptionResult {
  acceptedTemplateIds: string[];
  rejectedTemplateIds: string[];
}

export async function requestReminderSubscription(taskType: ReminderTaskType): Promise<SubscriptionResult> {
  const templateId = TEMPLATE_IDS[taskType];

  if (!templateId) {
    throw new Error(`缺少 ${taskType} 的订阅消息模板 ID`);
  }

  const result = await wx.requestSubscribeMessage({
    tmplIds: [templateId]
  });
  const status = result[templateId];

  return {
    acceptedTemplateIds: status === 'accept' ? [templateId] : [],
    rejectedTemplateIds: status === 'accept' ? [] : [templateId]
  };
}

export async function enqueueReminder(taskType: ReminderTaskType): Promise<void> {
  await callCloudFunction<{ taskType: ReminderTaskType }, { ok: boolean }>('sendReminder', {
    taskType
  });
}
