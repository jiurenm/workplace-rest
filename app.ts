import { initCloud } from './services/cloud';

App<IAppOption>({
  globalData: {
    cloudReady: false
  },

  onLaunch() {
    this.globalData.cloudReady = initCloud();
  }
});
