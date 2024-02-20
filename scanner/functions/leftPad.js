function leftPad(string, length4 = 8) {
    const padLength = Math.max(length4 - string.length, 0);
    return "".concat(" ".repeat(padLength)).concat(string);
  }