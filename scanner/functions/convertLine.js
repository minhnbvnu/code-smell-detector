function convertLine(line) {
  var m = fullStackRegex.exec(line);
  if (m) {
    return util.format(stackFormat, m[1], m[2], m[4], m[5]);
  }
  m = onlyFuncStackRegex.exec(line);
  if (m) {
    return util.format(stackFormat, '<module>', m[1], m[3], m[4]);
  }
  m = onlyFileStackRegex.exec(line);
  if (m) {
    return util.format(stackFormat, '<module>', '<root>', m[2], m[3]);
  }
  return line;
}