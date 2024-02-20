function testJumplist(name, keys, endPos, startPos, dialog) {
  endPos = makeCursor(endPos[0], endPos[1]);
  startPos = makeCursor(startPos[0], startPos[1]);
  testVim(name, function(cm, vim, helpers) {
    CodeMirror.Vim.resetVimGlobalState_();
    if(dialog)cm.openDialog = helpers.fakeOpenDialog('word');
    cm.setCursor(startPos);
    helpers.doKeys.apply(null, keys);
    helpers.assertCursorAt(endPos);
  }, {value: jumplistScene});
}