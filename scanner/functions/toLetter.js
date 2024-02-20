function toLetter(ch) {
    // T -> t, Shift-T -> T, '*' -> *, "Space" -> " "
    if (ch.slice(0, 6) == "Shift-") {
      return ch.slice(0, 1);
    } else {
      if (ch == "Space") return " ";
      if (ch.length == 3 && ch[0] == "'" && ch[2] == "'") return ch[1];
      return ch.toLowerCase();
    }
  }