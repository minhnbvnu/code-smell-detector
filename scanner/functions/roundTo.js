function roundTo(number, precision) {
  var d = Math.pow(10, precision || 0);
  return Math.round(number * d) / d;
}