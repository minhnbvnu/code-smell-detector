function secondEscCharacterHandler(ch){
      return function(cm) {
        var keys = getOption('insertModeEscKeys');
        var secondEscCharacter = keys && keys.length > 1 && keys.charAt(1);
        if (!getOption('enableInsertModeEscKeys')|| secondEscCharacter !== ch) {
          return CodeMirror.Pass;
          // This is not the handler you're looking for. Just insert as usual.
        } else {
          if (cm.state.vim.insertMode) {
            var lastChange = vimGlobalState.macroModeState.lastInsertModeChanges;
            if (lastChange && lastChange.changes.length) {
              lastChange.changes.pop();
            }
          }
          cm.state.vim.awaitingEscapeSecondCharacter = false;
          cm.replaceRange('', {ch: cm.getCursor().ch - 1, line: cm.getCursor().line},
                          cm.getCursor(), "+input");
          exitInsertMode(cm);
        }
      };
    }