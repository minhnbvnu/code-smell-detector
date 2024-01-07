function getBeforeAfterBodyLines(callback) {
  return pushOrConcat([], splitNewlines(callback));
}