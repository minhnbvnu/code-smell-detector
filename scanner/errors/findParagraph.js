function findParagraph(cm, head, repeat, dir, inclusive) {
      var line = head.line;
      var min = cm.firstLine();
      var max = cm.lastLine();
      var start, end, i = line;
      function isEmpty(i) { return !cm.getLine(i); }
      function isBoundary(i, dir, any) {
        if (any) { return isEmpty(i) != isEmpty(i + dir); }
        return !isEmpty(i) && isEmpty(i + dir);
      }
      if (dir) {
        while (min <= i && i <= max && repeat > 0) {
          if (isBoundary(i, dir)) { repeat--; }
          i += dir;
        }
        return new Pos(i, 0);
      }

      var vim = cm.state.vim;
      if (vim.visualLine && isBoundary(line, 1, true)) {
        var anchor = vim.sel.anchor;
        if (isBoundary(anchor.line, -1, true)) {
          if (!inclusive || anchor.line != line) {
            line += 1;
          }
        }
      }
      var startState = isEmpty(line);
      for (i = line; i <= max && repeat; i++) {
        if (isBoundary(i, 1, true)) {
          if (!inclusive || isEmpty(i) != startState) {
            repeat--;
          }
        }
      }
      end = new Pos(i, 0);
      // select boundary before paragraph for the last one
      if (i > max && !startState) { startState = true; }
      else { inclusive = false; }
      for (i = line; i > min; i--) {
        if (!inclusive || isEmpty(i) == startState || i == line) {
          if (isBoundary(i, -1, true)) { break; }
        }
      }
      start = new Pos(i, 0);
      return { start: start, end: end };
    }