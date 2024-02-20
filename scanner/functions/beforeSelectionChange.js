function beforeSelectionChange(cm, obj) {
      var vim = cm.state.vim;
      if (vim.insertMode || vim.exMode) return;

      var head = obj.ranges[0].head;
      var anchor = obj.ranges[0].anchor;
      if (head.ch && head.ch == cm.doc.getLine(head.line).length) {
        var pos = Pos(head.line, head.ch - 1);
        obj.update([{anchor: cursorEqual(head, anchor) ? pos : anchor,
                     head: pos}]);
      }
    }