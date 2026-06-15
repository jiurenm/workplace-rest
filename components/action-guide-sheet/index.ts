Component({
  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    guide: {
      type: Object,
      value: {}
    }
  },

  methods: {
    onSkip() {
      this.triggerEvent('skip');
    },

    onStart() {
      this.triggerEvent('start');
    }
  }
});
