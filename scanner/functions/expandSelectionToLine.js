function expandSelectionToLine(_cm, curStart, curEnd) {
      curStart.ch = 0;
      curEnd.ch = 0;
      curEnd.line++;
    }