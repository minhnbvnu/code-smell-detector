function testMovedownFixed(cm, hScroll) {
    cm.setSize("100px", "100px");
    if (hScroll) cm.setValue(new Array(100).join("x"));
    var bottom = displayBottom(cm, hScroll);
    for (var i = 0; i < 30; i++) {
      cm.replaceSelection("x\n");
      var cursorBottom = cm.cursorCoords(null, "window").bottom;
      is(cursorBottom <= bottom);
    }
    is(cursorBottom >= bottom - 5);
  }