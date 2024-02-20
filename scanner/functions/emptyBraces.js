function emptyBraces(str, arr, opts) {
  return braces(str.split('{}').join('\\{\\}'), arr, opts);
}