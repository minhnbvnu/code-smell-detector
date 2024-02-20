function nextLineBreak(code, from, end) {
    if (end === void 0)
      end = code.length;
    for (var i = from; i < end; i++) {
      var next = code.charCodeAt(i);
      if (isNewLine(next)) {
        return i < end - 1 && next === 13 && code.charCodeAt(i + 1) === 10 ? i + 2 : i + 1;
      }
    }
    return -1;
  }