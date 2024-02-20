function testVim(name, run, opts, expectedFail) {
  var vimOpts = {
    lineNumbers: true,
    vimMode: true,
    showCursorWhenSelecting: true,
    value: code
  };
  for (var prop in opts) {
    if (opts.hasOwnProperty(prop)) {
      vimOpts[prop] = opts[prop];
    }
  }
  return test('vim_' + name, function() {
    var place = document.getElementById("testground");
    var cm = CodeMirror(place, vimOpts);
    var vim = CodeMirror.Vim.maybeInitVimState_(cm);

    function doKeysFn(cm) {
      return function(args) {
        if (args instanceof Array) {
          arguments = args;
        }
        for (var i = 0; i < arguments.length; i++) {
          var result = CodeMirror.Vim.handleKey(cm, arguments[i]);
          if (!result && cm.state.vim.insertMode) {
            cm.replaceSelections(fillArray(arguments[i], cm.listSelections().length));
          }
        }
      }
    }
    function doInsertModeKeysFn(cm) {
      return function(args) {
        if (args instanceof Array) { arguments = args; }
        function executeHandler(handler) {
          if (typeof handler == 'string') {
            CodeMirror.commands[handler](cm);
          } else {
            handler(cm);
          }
          return true;
        }
        for (var i = 0; i < arguments.length; i++) {
          var key = arguments[i];
          // Find key in keymap and handle.
          var handled = CodeMirror.lookupKey(key, cm.getOption('keyMap'), executeHandler, cm);
          // Record for insert mode.
          if (handled == "handled" && cm.state.vim.insertMode && arguments[i] != 'Esc') {
            var lastChange = CodeMirror.Vim.getVimGlobalState_().macroModeState.lastInsertModeChanges;
            if (lastChange && (key.indexOf('Delete') != -1 || key.indexOf('Backspace') != -1)) {
              lastChange.changes.push(new CodeMirror.Vim.InsertModeKey(key));
            }
          }
        }
      }
    }
    function doExFn(cm) {
      return function(command) {
        cm.openDialog = helpers.fakeOpenDialog(command);
        helpers.doKeys(':');
      }
    }
    function assertCursorAtFn(cm) {
      return function(line, ch) {
        var pos;
        if (ch == null && typeof line.line == 'number') {
          pos = line;
        } else {
          pos = makeCursor(line, ch);
        }
        eqCursorPos(cm.getCursor(), pos);
      }
    }
    function fakeOpenDialog(result) {
      return function(text, callback) {
        return callback(result);
      }
    }
    function fakeOpenNotification(matcher) {
      return function(text) {
        matcher(text);
      }
    }
    var helpers = {
      doKeys: doKeysFn(cm),
      // Warning: Only emulates keymap events, not character insertions. Use
      // replaceRange to simulate character insertions.
      // Keys are in CodeMirror format, NOT vim format.
      doInsertModeKeys: doInsertModeKeysFn(cm),
      doEx: doExFn(cm),
      assertCursorAt: assertCursorAtFn(cm),
      fakeOpenDialog: fakeOpenDialog,
      fakeOpenNotification: fakeOpenNotification,
      getRegisterController: function() {
        return CodeMirror.Vim.getRegisterController();
      }
    }
    CodeMirror.Vim.resetVimGlobalState_();
    var successful = false;
    var savedOpenNotification = cm.openNotification;
    var savedOpenDialog = cm.openDialog;
    try {
      run(cm, vim, helpers);
      successful = true;
    } finally {
      cm.openNotification = savedOpenNotification;
      cm.openDialog = savedOpenDialog;
      if (!successful || verbose) {
        place.style.visibility = "visible";
      } else {
        place.removeChild(cm.getWrapperElement());
      }
    }
  }, expectedFail);
}