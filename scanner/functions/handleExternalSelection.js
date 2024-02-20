function handleExternalSelection(cm, vim) {
      var anchor = cm.getCursor('anchor');
      var head = cm.getCursor('head');
      // Enter or exit visual mode to match mouse selection.
      if (vim.visualMode && !cm.somethingSelected()) {
        exitVisualMode(cm, false);
      } else if (!vim.visualMode && !vim.insertMode && cm.somethingSelected()) {
        vim.visualMode = true;
        vim.visualLine = false;
        CodeMirror.signal(cm, "vim-mode-change", {mode: "visual"});
      }
      if (vim.visualMode) {
        // Bind CodeMirror selection model to vim selection model.
        // Mouse selections are considered visual characterwise.
        var headOffset = !cursorIsBefore(head, anchor) ? -1 : 0;
        var anchorOffset = cursorIsBefore(head, anchor) ? -1 : 0;
        head = offsetCursor(head, 0, headOffset);
        anchor = offsetCursor(anchor, 0, anchorOffset);
        vim.sel = {
          anchor: anchor,
          head: head
        };
        updateMark(cm, vim, '<', cursorMin(head, anchor));
        updateMark(cm, vim, '>', cursorMax(head, anchor));
      } else if (!vim.insertMode) {
        // Reset lastHPos if selection was modified by something outside of vim mode e.g. by mouse.
        vim.lastHPos = cm.getCursor().ch;
      }
    }