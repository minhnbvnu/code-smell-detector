function testSubstituteConfirm(name, command, initialValue, expectedValue, keys, finalPos) {
  testVim(name, function(cm, vim, helpers) {
    var savedOpenDialog = cm.openDialog;
    var savedKeyName = CodeMirror.keyName;
    var onKeyDown;
    var recordedCallback;
    var closed = true; // Start out closed, set false on second openDialog.
    function close() {
      closed = true;
    }
    // First openDialog should save callback.
    cm.openDialog = function(template, callback, options) {
      recordedCallback = callback;
    }
    // Do first openDialog.
    helpers.doKeys(':');
    // Second openDialog should save keyDown handler.
    cm.openDialog = function(template, callback, options) {
      onKeyDown = options.onKeyDown;
      closed = false;
    };
    // Return the command to Vim and trigger second openDialog.
    recordedCallback(command);
    // The event should really use keyCode, but here just mock it out and use
    // key and replace keyName to just return key.
    CodeMirror.keyName = function (e) { return e.key; }
    keys = keys.toUpperCase();
    for (var i = 0; i < keys.length; i++) {
      is(!closed);
      onKeyDown({ key: keys.charAt(i) }, '', close);
    }
    try {
      eq(expectedValue, cm.getValue());
      helpers.assertCursorAt(finalPos);
      is(closed);
    } catch(e) {
      throw e
    } finally {
      // Restore overridden functions.
      CodeMirror.keyName = savedKeyName;
      cm.openDialog = savedOpenDialog;
    }
  }, { value: initialValue });
}