function moveStateToRange({
  state,
  rangeStart,
  rangeEnd,
  contentLength,
  minContentLength,
  maxContentLength,
  containerLength
}) {
  // Length and offset must be computed separately, so that if the length is
  // clamped the offset will still be correct (unless it gets clamped too).
  const lengthClampedState = clampLength({
    state: {
      offset: state.offset,
      length: contentLength * (containerLength / (rangeEnd - rangeStart))
    },
    minContentLength,
    maxContentLength,
    containerLength
  });
  const offsetAdjustedState = clampOffset({
    offset: -rangeStart * (lengthClampedState.length / contentLength),
    length: lengthClampedState.length
  }, containerLength);
  return offsetAdjustedState;
}