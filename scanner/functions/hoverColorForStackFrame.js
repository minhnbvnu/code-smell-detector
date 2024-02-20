function hoverColorForStackFrame(stackFrame) {
  const color = dimmedColor(defaultHslaColorForStackFrame(stackFrame), COLOR_HOVER_DIM_DELTA);
  return hslaColorToString(color);
}