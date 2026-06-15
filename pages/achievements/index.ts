import type { AchievementsDashboard } from '../../models/dashboard';
import { getAchievementsDashboard } from '../../services/dashboard';

type AchievementTab = AchievementsDashboard['activeTab'];

Page({
  data: {
    dashboard: null as AchievementsDashboard | null,
    visibleAchievements: [] as AchievementsDashboard['achievements']
  },

  async onLoad() {
    const dashboard = await getAchievementsDashboard();

    this.setData({
      dashboard,
      visibleAchievements: dashboard.achievements
    });
  },

  onBack() {
    wx.navigateBack();
  },

  onChangeTab(event: WechatMiniprogram.BaseEvent) {
    const dashboard = this.data.dashboard;
    const tab = event.currentTarget.dataset.tab as AchievementTab | undefined;

    if (!dashboard || !tab) {
      return;
    }

    const visibleAchievements = dashboard.achievements.filter((achievement) => {
      if (tab === '已获得') {
        return achievement.earned;
      }

      if (tab === '未获得') {
        return !achievement.earned;
      }

      return true;
    });

    this.setData({
      dashboard: {
        ...dashboard,
        activeTab: tab
      },
      visibleAchievements
    });
  },

  onSharePoster() {
    wx.showToast({
      title: '分享海报后续接入',
      icon: 'none'
    });
  }
});
