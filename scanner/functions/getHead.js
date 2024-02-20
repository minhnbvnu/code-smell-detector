function getHead(cm) {
      var cur = cm.getCursor('head');
      if (cm.getSelection().length == 1) {
        // Small corner case when only 1 character is selected. The "real"
        // head is the left of head and anchor.
        cur = cursorMin(cur, cm.getCursor('anchor'));
      }
      return cur;
    }