function byParagraph(cm, pos, dir) {
    var no = pos.line, line = cm.getLine(no);
    var sawText = /\S/.test(dir < 0 ? line.slice(0, pos.ch) : line.slice(pos.ch));
    var fst = cm.firstLine(), lst = cm.lastLine();
    for (;;) {
      no += dir;
      if (no < fst || no > lst)
        return cm.clipPos(Pos(no - dir, dir < 0 ? 0 : null));
      line = cm.getLine(no);
      var hasText = /\S/.test(line);
      if (hasText) sawText = true;
      else if (sawText) return Pos(no, 0);
    }
  }