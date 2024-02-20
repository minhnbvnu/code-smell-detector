function stmt(s, f) {
    var x = delim(s);
    x.identifier = x.reserved = true;
    x.fud = f;
    return x;
  }