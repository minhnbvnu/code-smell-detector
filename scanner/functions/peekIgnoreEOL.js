function peekIgnoreEOL() {
    var i = 0;
    var t;
    do {
      t = peek(i++);
    } while (t.id === "(endline)");
    return t;
  }