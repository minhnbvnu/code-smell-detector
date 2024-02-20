function updateLastSelection(cm, vim) {
      var anchor = vim.sel.anchor;
      var head = vim.sel.head;
      // To accommodate the effect of lastPastedText in the last selection
      if (vim.lastPastedText) {
        head = cm.posFromIndex(cm.indexFromPos(anchor) + vim.lastPastedText.length);
        vim.lastPastedText = null;
      }
      vim.lastSelection = {'anchorMark': cm.setBookmark(anchor),
                           'headMark': cm.setBookmark(head),
                           'anchor': copyCursor(anchor),
                           'head': copyCursor(head),
                           'visualMode': vim.visualMode,
                           'visualLine': vim.visualLine,
                           'visualBlock': vim.visualBlock};
    }