function isClosingBracket(ch, pairs) {
    var pos = pairs.lastIndexOf(ch);
    return pos > -1 && pos % 2 == 1;
  }