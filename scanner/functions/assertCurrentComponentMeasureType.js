function assertCurrentComponentMeasureType(state, type) {
  if (state.currentReactComponentMeasure === null) {
    console.error(`Component measure type "${type}" stopped while no measure was in progress`);
  } else if (state.currentReactComponentMeasure.type !== type) {
    console.error(`Component measure type "${type}" stopped while type ${state.currentReactComponentMeasure.type} in progress`);
  }
}