function clampState({
  state,
  minContentLength,
  maxContentLength,
  containerLength
}) {
  return clampOffset(clampLength({
    state,
    minContentLength,
    maxContentLength,
    containerLength
  }), containerLength);
}