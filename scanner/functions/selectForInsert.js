function selectForInsert(cm, head, height) {
      var sel = [];
      for (var i = 0; i < height; i++) {
        var lineHead = offsetCursor(head, i, 0);
        sel.push({anchor: lineHead, head: lineHead});
      }
      cm.setSelections(sel, 0);
    }