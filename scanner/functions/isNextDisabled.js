function isNextDisabled() {
    if (
      state.stepper_state === StepperState.DATASET &&
      state.dataset_category === DatasetCategory.SAMPLE &&
      state.sample_dataset == null
    ) {
      return true;
    }
    if (state.stepper_state === StepperState.VISUALIZE) {
      return false;
    }
    return (
      state.stepper_state !== StepperState.PREPROCESSORS &&
      !getOptions(state).some((val) => getIsSelected(val.label))
    );
  }