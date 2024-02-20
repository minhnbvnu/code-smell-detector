function moveTillChar(cm, cHar, motion_options) {
    // Move to cHar in line, as found by charIdxInLine.
    var idx = charIdxInLine(cm, cHar, motion_options), cur = cm.getCursor();
    if (idx != -1) cm.setCursor({line: cur.line, ch: idx});
  }