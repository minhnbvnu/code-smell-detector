function parseDataAttributes(note) {
  var o = {};
  var parts;
  if (note) {
    parts = note.split(/[\r\n;,]+/);
    for (var i = 0; i < parts.length; i++) {
      parseKeyValueString(parts[i], o);
    }
  }
  return o;
}