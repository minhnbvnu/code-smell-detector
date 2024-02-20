function getSupportLevel(stream) {
  var level = supportsColor(stream);
  return translateLevel(level);
}