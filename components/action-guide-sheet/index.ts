Component({
  properties: {
    visible: {
      type: Boolean,
      value: false
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
