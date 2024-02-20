function moveToEol(cm, head, motionArgs, vim, keepHPos) {
      var cur = head;
      var retval= Pos(cur.line + motionArgs.repeat - 1, Infinity);
      var end=cm.clipPos(retval);
      end.ch--;
      if (!keepHPos) {
        vim.lastHPos = Infinity;
        vim.lastHSPos = cm.charCoords(end,'div').left;
      }
      return retval;
    }