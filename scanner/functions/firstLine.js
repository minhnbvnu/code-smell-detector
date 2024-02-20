function firstLine(str) {
    var end = str.indexOf("\n");
    if (end < 0) return str;
    return str.slice(0, end);
  }