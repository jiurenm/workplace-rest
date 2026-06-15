import type { ReminderTask } from '../../models/reminder';

Component({
  properties: {
    task: {
      type: Object,
      value: {}
    }
  },

  data: {
    fallbackTitle: '暂无提醒'
  },

  methods: {
    getTask(): ReminderTask | null {
      const task = this.properties.task as ReminderTask | undefined;

      return task?.id ? task : null;
    }
  }
});
