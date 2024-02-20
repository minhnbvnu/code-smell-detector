function parseYaml(str) {
  // TODO: strip comments // var comment = /\s*/
  var o = {};
  var lines = stringToLines(str);
  for (var i = 0; i < lines.length; i++) {
    parseKeyValueString(lines[i], o);
  }
  return o;
}