function makeItWrapAfter(cm, pos) {
  var firstLineTop = cm.cursorCoords(Pos(0, 0)).top;
  for(var w = 0, posTop; posTop != firstLineTop; ++w) {
    cm.setSize(w);
    posTop = cm.charCoords(pos).top;
  }
}