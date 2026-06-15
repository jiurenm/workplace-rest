Component({
  properties: {
    items: {
      type: Array,
      value: []
    },
    selected: {
      type: String,
      value: ''
    }
  },

  methods: {
    onSelect(event: WechatMiniprogram.BaseEvent) {
      this.triggerEvent('select', {
        taskType: event.currentTarget.dataset.taskType
      });
    },

    onAdjust(event: WechatMiniprogram.BaseEvent) {
      this.triggerEvent('adjust', {
        taskType: event.currentTarget.dataset.taskType
      });
    }
  }
});
