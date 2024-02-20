function zoomState({
  state,
  multiplier,
  fixedPoint,
  minContentLength,
  maxContentLength,
  containerLength
}) {
  // Length and offset must be computed separately, so that if the length is
  // clamped the offset will still be correct (unless it gets clamped too).
  const zoomedState = clampLength({
    state: {
      offset: state.offset,
      length: state.length * multiplier
    },
    minContentLength,
    maxContentLength,
    containerLength
  }); // Adjust offset so that distance between containerStart<->fixedPoint is fixed

  const fixedPointFromContainer = fixedPoint + state.offset;
  const scaledFixedPoint = fixedPoint * (zoomedState.length / state.length);
  const offsetAdjustedState = clampOffset({
    offset: fixedPointFromContainer - scaledFixedPoint,
    length: zoomedState.length
  }, containerLength);
  return offsetAdjustedState;
}