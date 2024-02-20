function clampLength({
  state,
  minContentLength,
  maxContentLength,
  containerLength
}) {
  return {
    offset: state.offset,
    length: clamp(Math.max(minContentLength, containerLength), Math.max(containerLength, maxContentLength), state.length)
  };
}