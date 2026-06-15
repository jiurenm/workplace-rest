import { getReminderTasks } from '../../services/reminder';
import { getTodayStats } from '../../services/checkin';
import type { DailyStats } from '../../models/stats';
import type { ReminderTask } from '../../models/reminder';

Page({
  data: {
    title: '首页',
    note: '提醒倒计时、提前打卡和今日健康概览的页面骨架。',
    tasks: [] as ReminderTask[],
    stats: null as DailyStats | null
  },

  async onLoad() {
    const [tasks, stats] = await Promise.all([getReminderTasks(), getTodayStats()]);

    this.setData({
      tasks,
      stats
    });
  }
});
