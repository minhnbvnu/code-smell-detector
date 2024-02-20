function getOnPasteFn(cm) {
      var vim = cm.state.vim;
      if (!vim.onPasteFn) {
        vim.onPasteFn = function() {
          if (!vim.insertMode) {
            cm.setCursor(offsetCursor(cm.getCursor(), 0, 1));
            actions.enterInsertMode(cm, {}, vim);
          }
        };
      }
      return vim.onPasteFn;
    }