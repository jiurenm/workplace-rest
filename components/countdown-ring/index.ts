Component({
  properties: {
    task: {
      type: Object,
      value: {}
    }
  },

  methods: {
    onTapRing() {
      this.triggerEvent('ringtap');
    }
  }
});
