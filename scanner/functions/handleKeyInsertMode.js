function handleKeyInsertMode() {
          if (handleEsc()) { return true; }
          var keys = vim.inputState.keyBuffer = vim.inputState.keyBuffer + key;
          var keysAreChars = key.length == 1;
          var match = commandDispatcher.matchCommand(keys, defaultKeymap, vim.inputState, 'insert');
          // Need to check all key substrings in insert mode.
          while (keys.length > 1 && match.type != 'full') {
            var keys = vim.inputState.keyBuffer = keys.slice(1);
            var thisMatch = commandDispatcher.matchCommand(keys, defaultKeymap, vim.inputState, 'insert');
            if (thisMatch.type != 'none') { match = thisMatch; }
          }
          if (match.type == 'none') { clearInputState(cm); return false; }
          else if (match.type == 'partial') {
            if (lastInsertModeKeyTimer) { window.clearTimeout(lastInsertModeKeyTimer); }
            lastInsertModeKeyTimer = window.setTimeout(
              function() { if (vim.insertMode && vim.inputState.keyBuffer) { clearInputState(cm); } },
              getOption('insertModeEscKeysTimeout'));
            return !keysAreChars;
          }

          if (lastInsertModeKeyTimer) { window.clearTimeout(lastInsertModeKeyTimer); }
          if (keysAreChars) {
            var selections = cm.listSelections();
            for (var i = 0; i < selections.length; i++) {
              var here = selections[i].head;
              cm.replaceRange('', offsetCursor(here, 0, -(keys.length - 1)), here, '+input');
            }
            vimGlobalState.macroModeState.lastInsertModeChanges.changes.pop();
          }
          clearInputState(cm);
          return match.command;
        }