import type { HomeDashboard, TaskProgress } from '../../models/dashboard';
import type { ReminderTaskType } from '../../models/reminder';
import { createCheckin } from '../../services/checkin';
import { getHomeDashboard } from '../../services/dashboard';
import { pauseAllReminders, resumeAllReminders } from '../../services/reminder';

Page({
  data: {
    dashboard: null as HomeDashboard | null,
    paused: false,
    sheetVisible: false
  },

  async onLoad() {
    const dashboard = await getHomeDashboard();

    this.setData({
      dashboard
    });
  },

  async onTogglePause() {
    const paused = !this.data.paused;

    if (paused) {
      await pauseAllReminders();
    } else {
      await resumeAllReminders();
    }

    this.setData({
      paused
    });

    wx.showToast({
      title: paused ? '已暂停提醒' : '已恢复提醒',
      icon: 'none'
    });
  },

  onSelectTask(event: WechatMiniprogram.CustomEvent<{ taskType?: ReminderTaskType }>) {
    const dashboard = this.data.dashboard;
    const taskType = event.detail?.taskType as ReminderTaskType | undefined;

    if (!dashboard || !taskType) {
      return;
    }

    const currentTask = dashboard.tasks.find((task) => task.taskType === taskType);

    if (!currentTask) {
      return;
    }

    this.setData({
      dashboard: {
        ...dashboard,
        currentTask
      }
    });
  },

  onAdjustTask(event: WechatMiniprogram.CustomEvent<{ taskType?: ReminderTaskType }>) {
    const dashboard = this.data.dashboard;
    const taskType = event.detail?.taskType as ReminderTaskType | undefined;
    const task = dashboard?.tasks.find((item) => item.taskType === taskType);

    if (!task) {
      return;
    }

    wx.showToast({
      title: `调整${task.title}提醒`,
      icon: 'none'
    });
  },

  async onQuickCheckin() {
    const dashboard = this.data.dashboard;

    if (!dashboard) {
      return;
    }

    await createCheckin(dashboard.currentTask.taskType);

    const currentTask = incrementTask(dashboard.currentTask);
    const tasks = dashboard.tasks.map((task) => (task.taskType === currentTask.taskType ? currentTask : task));

    this.setData({
      dashboard: {
        ...dashboard,
        currentTask,
        tasks
      }
    });

    wx.vibrateShort({
      type: 'light'
    });
    wx.showToast({
      title: `打卡成功，今日${currentTask.title}+1`,
      icon: 'none'
    });
  },

  onShowGuide() {
    if (this.data.dashboard?.currentTask.taskType !== 'eye') {
      return;
    }

    this.setData({
      sheetVisible: true
    });
  },

  onHideGuide() {
    this.setData({
      sheetVisible: false
    });
  },

  onStartGuide() {
    this.setData({
      sheetVisible: false
    });
    wx.showToast({
      title: '护眼计时开始',
      icon: 'none'
    });
  }
});

function incrementTask(task: TaskProgress): TaskProgress {
  const completed = Math.min(task.completed + 1, task.target);

  return {
    ...task,
    completed,
    progressPercent: Math.min(Math.round((completed / task.target) * 100), 100)
  };
}
