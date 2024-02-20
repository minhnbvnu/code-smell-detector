function convertCurToNumber(cur) {
    // max characters of a line is 999,999.
    return cur.line + cur.ch / Math.pow(10, 6);
  }