function findLastWithPosition(tokens) {
  for (var i = tokens.length - 1; i >= 0; i--) {
    var token = tokens[i];
    var pos = token[3] || token[2];
    if (pos) return pos;
  }
}