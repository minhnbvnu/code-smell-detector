function testMovedownResize(cm, hScroll) {
    cm.getWrapperElement().style.height = "auto";
    if (hScroll) cm.setValue(new Array(100).join("x"));
    cm.refresh();
    for (var i = 0; i < 30; i++) {
      cm.replaceSelection("x\n");
      var bottom = displayBottom(cm, hScroll);
      var cursorBottom = cm.cursorCoords(null, "window").bottom;
      is(cursorBottom <= bottom);
      is(cursorBottom >= bottom - 5);
    }
  }