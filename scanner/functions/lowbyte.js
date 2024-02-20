function lowbyte(c2) {
    var n2 = c2.charCodeAt(0);
    var x2 = {
      8: "b",
      9: "t",
      10: "n",
      12: "f",
      13: "r"
    }[n2];
    if (x2) {
      return "\\" + x2;
    }
    return "\\x" + (n2 < 16 ? "0" : "") + $toUpperCase.call(n2.toString(16));
  }