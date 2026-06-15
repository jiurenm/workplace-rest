import type { ProfileDashboard } from '../../models/dashboard';
import { getProfileDashboard } from '../../services/dashboard';

Page({
  data: {
    dashboard: null as ProfileDashboard | null
  },

  async onLoad() {
    const dashboard = await getProfileDashboard();

    this.setData({
      dashboard
    });
  },

  onTapMenu(event: WechatMiniprogram.BaseEvent) {
    const title = event.currentTarget.dataset.title as string | undefined;

    wx.showToast({
      title: title ? `${title}后续接入` : '后续接入',
      icon: 'none'
    });
  }
});
