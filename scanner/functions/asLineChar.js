function asLineChar(file, pos) {
    if (!file) return {
      line: 0,
      ch: 0
    };
    var offsets = file.lineOffsets || (file.lineOffsets = [0]);
    var text = file.text,
        line,
        lineStart;

    for (var i = offsets.length - 1; i >= 0; --i) if (offsets[i] <= pos) {
      line = i * offsetSkipLines;
      lineStart = offsets[i];
    }

    for (;;) {
      var eol = text.indexOf("\n", lineStart);
      if (eol >= pos || eol < 0) break;
      lineStart = eol + 1;
      ++line;
    }

    return {
      line: line,
      ch: charDistanceBetween(file, lineStart, pos)
    };
  }