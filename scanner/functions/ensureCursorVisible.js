function ensureCursorVisible(cm) {
  resolveScrollToPos(cm);
  var cur = cm.getCursor(), from = cur, to = cur;
  if (!cm.options.lineWrapping) {
    from = cur.ch ? Pos(cur.line, cur.ch - 1) : cur;
    to = Pos(cur.line, cur.ch + 1);
  }
  cm.curOp.scrollToPos = {from: from, to: to, margin: cm.options.cursorScrollMargin, isCursor: true};
}