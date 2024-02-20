function getProgressBarValue() {
    if (state.stepper_finish) {
      return 200;
    }
    return (100 * (getActiveStep(state) + 1)) / StepperStateOrder.length;
  }