import type { SettingsDashboard } from '../../models/dashboard';
import type { ReminderTaskType } from '../../models/reminder';
import { getSettingsDashboard } from '../../services/dashboard';

Page({
  data: {
    dashboard: null as SettingsDashboard | null
  },

  async onLoad() {
    const dashboard = await getSettingsDashboard();

    this.setData({
      dashboard
    });
  },

  onToggleReminder(event: WechatMiniprogram.CustomEvent<{ value: boolean }>) {
    const dashboard = this.data.dashboard;
    const taskType = event.currentTarget.dataset.taskType as ReminderTaskType | undefined;

    if (!dashboard || !taskType) {
      return;
    }

    const reminderRows = dashboard.reminderRows.map((row) =>
      row.taskType === taskType
        ? {
            ...row,
            enabled: event.detail.value
          }
        : row
    );

    this.setData({
      dashboard: {
        ...dashboard,
        reminderRows
      }
    });
  },

  onTapPlaceholder(event: WechatMiniprogram.BaseEvent) {
    const title = event.currentTarget.dataset.title as string | undefined;

    wx.showToast({
      title: title ? `${title}后续接入` : '后续接入',
      icon: 'none'
    });
  }
});
