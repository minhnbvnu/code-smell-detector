function isAtStepAndActive(number) {
  return (
    state.walkthrough.enabled && state.walkthrough.show && isAtStep(number)
  );
}