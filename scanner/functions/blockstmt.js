function blockstmt(s, f) {
    var x = stmt(s, f);
    x.block = true;
    return x;
  }