function testCoordsWrappedBidi(str) {
  testCM("coords_wrapped_bidi_" + str, function(cm) {
    cm.getScrollerElement().style.fontFamily = "monospace";
    makeItWrapAfter(cm, Pos(0, 5));

    // Make sure we are at the visual beginning of the first line
    var pos = Pos(0, 0), lastPos;
    cm.doc.setCursor(pos);
    do {
      lastPos = pos;
      cm.execCommand("goCharLeft");
      pos = cm.doc.getCursor();
    } while (pos != lastPos)

    var top = cm.charCoords(Pos(0, 0)).top, lastTop;
    for (var i = 1; i < str.length; ++i) {
      lastTop = top;
      top = cm.charCoords(Pos(0, i)).top;
      is(top >= lastTop);
    }
  }, {value: str, lineWrapping: true})
}