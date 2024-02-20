function isHeader(lineNo) {
    var tokentype = cm.getTokenTypeAt(CodeMirror.Pos(lineNo, 0));
    return tokentype && /\bheader\b/.test(tokentype);
  }