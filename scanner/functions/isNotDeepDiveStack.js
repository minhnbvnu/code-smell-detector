function isNotDeepDiveStack(line) {
  return line.indexOf('appmetrics') == -1 && line.indexOf('lib/aspect.js') == -1;
}