function assertNoOverlappingComponentMeasure(state) {
  if (state.currentReactComponentMeasure !== null) {
    console.error('Component measure started while another measure in progress:', state.currentReactComponentMeasure);
  }
}