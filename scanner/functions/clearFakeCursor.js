function clearFakeCursor(vim) {
      if (vim.fakeCursor) {
        vim.fakeCursor.clear();
        vim.fakeCursor = null;
      }
      if (vim.fakeCursorBookmark) {
        vim.fakeCursorBookmark.clear();
        vim.fakeCursorBookmark = null;
      }
    }