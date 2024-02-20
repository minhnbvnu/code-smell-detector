function getVizContent() {
    if (state.stepper_finish) {
      return <StepperFinish />;
    }
    if (state.stepper_state === StepperState.VISUALIZE) {
      return <PlotsContainer />;
    }
    return <VisualizerOptionSelectionGrid />;
  }