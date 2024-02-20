function probeBuffer(buffer) {
  var parser_names = Object.keys(parsers);

  for (var i = 0; i < parser_names.length; i++) {
    var result = parsers[parser_names[i]](buffer);

    if (result) return result;
  }

  return null;
}