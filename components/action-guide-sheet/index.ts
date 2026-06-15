Component({
  properties: {
    visible: {
      type: Boolean,
      value: false,
      observer(value: boolean) {
        if (value) {
          this.resetPractice();
        } else {
          this.clearPracticeTimer();
        }
      }
    },
    guide: {
      type: Object,
      value: {}
    }
  },

  data: {
    activeStepIndex: 0,
    currentValue: 20,
    currentUnit: 's',
    isRunning: false,
    isComplete: false,
    actionLabel: '开始 20s 护眼操',
    skipLabel: '跳过'
  },

  lifetimes: {
    detached() {
      this.clearPracticeTimer();
    }
  },

  methods: {
    onClose() {
      this.clearPracticeTimer();
      this.triggerEvent('skip');
    },

    onSkipStep() {
      if (this.data.isComplete) {
        this.onClose();
        return;
      }

      this.goToNextStep();
    },

    onStart() {
      if (this.data.isComplete) {
        this.onClose();
        return;
      }

      if (this.data.isRunning) {
        return;
      }

      if (this.data.currentValue <= 0) {
        this.goToNextStep();
        return;
      }

      const step = PRACTICE_STEPS[this.data.activeStepIndex];

      if (step.mode === 'manual') {
        this.recordManualAction();
        return;
      }

      this.setData({
        isRunning: true,
        actionLabel: '护眼操进行中'
      });
      this.runCurrentStep();
    },

    resetPractice() {
      this.clearPracticeTimer();
      this.setData({
        activeStepIndex: 0,
        currentValue: 20,
        currentUnit: 's',
        isRunning: false,
        isComplete: false,
        actionLabel: '开始 20s 护眼操',
        skipLabel: '跳过'
      });
    },

    clearPracticeTimer() {
      if (practiceTimer) {
        clearInterval(practiceTimer);
        practiceTimer = undefined;
      }
    },

    runCurrentStep() {
      const step = PRACTICE_STEPS[this.data.activeStepIndex];

      if (!step) {
        this.finishPractice();
        return;
      }

      this.setData({
        currentValue: step.value,
        currentUnit: step.unit
      });

      if (step.mode === 'manual') {
        return;
      }

      this.clearPracticeTimer();
      practiceTimer = setInterval(() => {
        if (this.data.currentValue <= 1) {
          this.completeCurrentStep();
          return;
        }

        this.setData({
          currentValue: this.data.currentValue - 1
        });
      }, 1000);
    },

    recordManualAction() {
      const nextValue = this.data.currentValue - 1;

      if (nextValue <= 0) {
        this.completeCurrentStep();
        return;
      }

      this.setData({
        currentValue: nextValue,
        actionLabel: `再眨 ${nextValue} 次`
      });
    },

    completeCurrentStep() {
      this.clearPracticeTimer();
      this.setData({
        currentValue: 0,
        isRunning: false,
        actionLabel: this.data.activeStepIndex >= PRACTICE_STEPS.length - 1 ? '完成' : '下一步',
        skipLabel: this.data.activeStepIndex >= PRACTICE_STEPS.length - 1 ? '关闭' : '跳过'
      });
    },

    goToNextStep() {
      const nextIndex = this.data.activeStepIndex + 1;

      this.clearPracticeTimer();

      if (nextIndex >= PRACTICE_STEPS.length) {
        this.finishPractice();
        return;
      }

      this.setData({
        activeStepIndex: nextIndex,
        isRunning: false,
        isComplete: false,
        actionLabel: PRACTICE_STEPS[nextIndex].label,
        skipLabel: '跳过'
      });
      this.prepareCurrentStep();
    },

    prepareCurrentStep() {
      const step = PRACTICE_STEPS[this.data.activeStepIndex];

      this.setData({
        currentValue: step.value,
        currentUnit: step.unit
      });
    },

    finishPractice() {
      this.clearPracticeTimer();
      this.setData({
        isRunning: false,
        isComplete: true,
        currentValue: 0,
        currentUnit: 's',
        actionLabel: '完成',
        skipLabel: '关闭'
      });
    }
  }
});

const PRACTICE_STEPS = [
  { value: 20, unit: 's', label: '开始 20s 护眼操', mode: 'timer' },
  { value: 10, unit: '次', label: '眨眼 1 次', mode: 'manual' },
  { value: 15, unit: 's', label: '开始 15s 热敷', mode: 'timer' }
];

let practiceTimer: ReturnType<typeof setInterval> | undefined;
