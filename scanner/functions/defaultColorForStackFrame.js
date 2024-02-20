function defaultColorForStackFrame(stackFrame) {
  const color = defaultHslaColorForStackFrame(stackFrame);
  return hslaColorToString(color);
}