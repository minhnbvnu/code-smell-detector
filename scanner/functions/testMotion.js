function testMotion(name, keys, endPos, startPos) {
  testVim(name, function(cm, vim, helpers) {
    if (!startPos) {
      startPos = new Pos(0, 0);
    }
    cm.setCursor(startPos);
    helpers.doKeys(keys);
    helpers.assertCursorAt(endPos);
  });
}