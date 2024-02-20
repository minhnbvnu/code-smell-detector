function notAtEnd(cm, pos) {
    var len = cm.getLine(pos.line).length;
    if (!len || pos.ch == len) return Pos(pos.line, pos.ch - 1);
    return pos;
  }