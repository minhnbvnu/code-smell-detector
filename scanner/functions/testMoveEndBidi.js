function testMoveEndBidi(str) {
  testCM("move_end_bidi_" + str, function(cm) {
    cm.getScrollerElement().style.fontFamily = "monospace";
    makeItWrapAfter(cm, Pos(0, 5));

    cm.execCommand("goLineStart");
    var pos = cm.doc.getCursor();
    cm.execCommand("goCharLeft");
    eqCursorPos(pos, cm.doc.getCursor());

    cm.execCommand("goLineEnd");
    pos = cm.doc.getCursor();
    cm.execCommand("goColumnRight");
    eqCursorPos(pos, cm.doc.getCursor());
  }, {value: str, lineWrapping: true})
}