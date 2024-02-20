function defaultHslaColorForStackFrame({
  scriptUrl
}) {
  return colorGenerator.colorForID(scriptUrl !== null && scriptUrl !== void 0 ? scriptUrl : '');
}