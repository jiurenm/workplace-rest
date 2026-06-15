import type { StatsDashboard } from '../../models/dashboard';
import { getStatsDashboard } from '../../services/dashboard';

type StatsRange = StatsDashboard['activeRange'];

Page({
  data: {
    dashboard: null as StatsDashboard | null,
    rangeTabs: ['7天', '30天', '自定义'] as StatsRange[]
  },

  async onLoad() {
    const dashboard = await getStatsDashboard();

    this.setData({
      dashboard
    });
  },

  onChangeRange(event: WechatMiniprogram.BaseEvent) {
    const dashboard = this.data.dashboard;
    const range = event.currentTarget.dataset.range as StatsRange | undefined;

    if (!dashboard || !range) {
      return;
    }

    this.setData({
      dashboard: {
        ...dashboard,
        activeRange: range
      }
    });
  },

  onShareAchievement() {
    wx.showToast({
      title: '分享海报后续接入',
      icon: 'none'
    });
  },

  onOpenAchievements() {
    wx.navigateTo({
      url: '/pages/achievements/index'
    });
  }
});
