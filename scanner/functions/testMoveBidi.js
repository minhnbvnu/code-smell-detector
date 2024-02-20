function testMoveBidi(str) {
  testCM("move_bidi_" + str, function(cm) {
    if (cm.getOption("inputStyle") != "textarea" || !cm.getOption("rtlMoveVisually")) return;
    cm.getScrollerElement().style.fontFamily = "monospace";
    makeItWrapAfter(cm, Pos(0, 5));

    var steps = str.length - countIf(str.split(""), function(ch) { return extendingChars.test(ch) });
    var lineBreaks = {}
    lineBreaks[6 - countIf(str.substr(0, 5).split(""), function(ch) { return extendingChars.test(ch) })] = 'w';
    if (str.indexOf("\n") != -1) {
      lineBreaks[steps - 2] = 'n';
    }

    // Make sure we are at the visual beginning of the first line
    cm.execCommand("goLineStart");

    var prevCoords = cm.cursorCoords(), coords;
    for(var i = 0; i < steps; ++i) {
      cm.execCommand("goCharRight");
      coords = cm.cursorCoords();
      if ((i >= 10 && i <= 12) && !lineBreaks[i] && coords.left < prevCoords.left && coords.top > prevCoords.top) {
        // The first line wraps twice
        lineBreaks[i] = 'w';
      }
      if (!lineBreaks[i]) {
        is(coords.left > prevCoords.left, "In step " + i + ", cursor didn't move right");
        eq(coords.top, prevCoords.top, "In step " + i + ", cursor moved out of line");
      } else {
        is(coords.left < prevCoords.left, i);
        is(coords.top > prevCoords.top, i);
      }
      prevCoords = coords;
    }

    cm.execCommand("goCharRight");
    coords = cm.cursorCoords();
    eq(coords.left, prevCoords.left, "Moving " + steps + " steps right didn't reach the end");
    eq(coords.top, prevCoords.top, "Moving " + steps + " steps right didn't reach the end");

    for(i = steps - 1; i >= 0; --i) {
      cm.execCommand("goCharLeft");
      coords = cm.cursorCoords();
      if (!(lineBreaks[i] == 'n' || lineBreaks[i + 1] == 'w')) {
        is(coords.left < prevCoords.left, "In step " + i + ", cursor didn't move left");
        eq(coords.top, prevCoords.top, "In step " + i + ", cursor is not at the same line anymore");
      } else {
        is(coords.left > prevCoords.left, i);
        is(coords.top < prevCoords.top, i);
      }
      prevCoords = coords;
    }

    cm.execCommand("goCharLeft");
    coords = cm.cursorCoords();
    eq(coords.left, prevCoords.left, "Moving " + steps + " steps left didn't reach the beginning");
    eq(coords.top, prevCoords.top, "Moving " + steps + " steps left didn't reach the beginning");
  }, {value: str, lineWrapping: true})
}