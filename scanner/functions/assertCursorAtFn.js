function assertCursorAtFn(cm) {
      return function(line, ch) {
        var pos;
        if (ch == null && typeof line.line == 'number') {
          pos = line;
        } else {
          pos = makeCursor(line, ch);
        }
        eqCursorPos(cm.getCursor(), pos);
      }
    }