function parseKeyValueString(str, o) {
  var dqRxp = /^"(?:[^"\\]|\\.)*"$/;
  var parts = str.split(':');
  var k, v;
  if (parts.length > 1) {
    k = trim(parts.shift());
    v = trim(parts.join(':'));
    if (dqRxp.test(v)) {
      v = JSON.parse(v); // use JSON library to parse quoted strings
    }
    o[k] = v;
  }
}