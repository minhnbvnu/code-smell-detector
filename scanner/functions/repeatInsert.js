function repeatInsert(repeat) {
        if (macroModeState.lastInsertModeChanges.changes.length > 0) {
          // For some reason, repeat cw in desktop VIM does not repeat
          // insert mode changes. Will conform to that behavior.
          repeat = !vim.lastEditActionCommand ? 1 : repeat;
          var changeObject = macroModeState.lastInsertModeChanges;
          repeatInsertModeChanges(cm, changeObject.changes, repeat);
        }
      }