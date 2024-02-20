function getSuffix(hint, formatter) {
  return hint ? ` (${formatter.grey(hint)})` : '';
}