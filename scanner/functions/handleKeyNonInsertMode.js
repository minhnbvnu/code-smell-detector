function handleKeyNonInsertMode() {
          if (handleMacroRecording() || handleEsc()) { return true; }

          var keys = vim.inputState.keyBuffer = vim.inputState.keyBuffer + key;
          if (/^[1-9]\d*$/.test(keys)) { return true; }

          var keysMatcher = /^(\d*)(.*)$/.exec(keys);
          if (!keysMatcher) { clearInputState(cm); return false; }
          var context = vim.visualMode ? 'visual' :
                                         'normal';
          var match = commandDispatcher.matchCommand(keysMatcher[2] || keysMatcher[1], defaultKeymap, vim.inputState, context);
          if (match.type == 'none') { clearInputState(cm); return false; }
          else if (match.type == 'partial') { return true; }

          vim.inputState.keyBuffer = '';
          var keysMatcher = /^(\d*)(.*)$/.exec(keys);
          if (keysMatcher[1] && keysMatcher[1] != '0') {
            vim.inputState.pushRepeatDigit(keysMatcher[1]);
          }
          return match.command;
        }