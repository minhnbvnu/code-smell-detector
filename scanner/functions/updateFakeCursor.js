function updateFakeCursor(cm) {
      var className = 'cm-animate-fat-cursor';
      var vim = cm.state.vim;
      var from = clipCursorToContent(cm, copyCursor(vim.sel.head));
      var to = offsetCursor(from, 0, 1);
      clearFakeCursor(vim);
      // In visual mode, the cursor may be positioned over EOL.
      if (from.ch == cm.getLine(from.line).length) {
        var widget = document.createElement("span");
        widget.textContent = "\u00a0";
        widget.className = className;
        vim.fakeCursorBookmark = cm.setBookmark(from, {widget: widget});
      } else {
        vim.fakeCursor = cm.markText(from, to, {className: className});
      }
    }