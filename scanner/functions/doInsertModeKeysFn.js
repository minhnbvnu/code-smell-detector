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