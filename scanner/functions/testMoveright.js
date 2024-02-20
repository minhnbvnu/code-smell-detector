function testMoveright(cm, wrap, scroll) {
    cm.setSize("100px", "100px");
    if (wrap) cm.setOption("lineWrapping", true);
    if (scroll) {
      cm.setValue("\n" + new Array(100).join("x\n"));
      cm.setCursor(Pos(0, 0));
    }
    var right = displayRight(cm, scroll);
    for (var i = 0; i < 10; i++) {
      cm.replaceSelection("xxxxxxxxxx");
      var cursorRight = cm.cursorCoords(null, "window").right;
      is(cursorRight < right);
    }
    if (!wrap) is(cursorRight > right - 20);
  }