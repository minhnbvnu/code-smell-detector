function stringToLines(str) {
  var empty = /^\s*$/;
  return filter(str.split(/[\r\n\x03]+/), function(line) {
    return !empty.test(line);
  });
}