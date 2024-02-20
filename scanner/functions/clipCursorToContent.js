function clipCursorToContent(cm, cur) {
      var vim = cm.state.vim;
      var includeLineBreak = vim.insertMode || vim.visualMode;
      var line = Math.min(Math.max(cm.firstLine(), cur.line), cm.lastLine() );
      var maxCh = lineLength(cm, line) - 1 + !!includeLineBreak;
      var ch = Math.min(Math.max(0, cur.ch), maxCh);
      return Pos(line, ch);
    }