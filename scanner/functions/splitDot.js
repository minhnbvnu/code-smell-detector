function splitDot (path) {
  if (path in splitCache) { return splitCache[path]; }
  splitCache[path] = path.split('.');
  return splitCache[path];
}