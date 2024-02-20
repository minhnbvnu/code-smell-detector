function translateState({
  state,
  delta,
  containerLength
}) {
  return clampOffset({
    offset: state.offset + delta,
    length: state.length
  }, containerLength);
}