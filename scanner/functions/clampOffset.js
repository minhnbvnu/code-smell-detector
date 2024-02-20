function clampOffset(state, containerLength) {
  return {
    offset: clamp(-(state.length - containerLength), 0, state.offset),
    length: state.length
  };
}