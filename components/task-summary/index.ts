import type { DailyStats } from '../../models/stats';

Component({
  properties: {
    stats: {
      type: Object,
      value: {}
    }
  },

  methods: {
    getStats(): DailyStats | null {
      const stats = this.properties.stats as DailyStats | undefined;

      return stats?.date ? stats : null;
    }
  }
});
