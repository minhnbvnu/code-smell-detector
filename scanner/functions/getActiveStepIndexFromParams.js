function getActiveStepIndexFromParams(params) {
  return typeof params.stepIndex !== 'undefined' ? Number(params.stepIndex) : 0;
}