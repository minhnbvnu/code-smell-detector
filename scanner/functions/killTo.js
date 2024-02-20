function killTo(cm, by, dir, ring) {
    var selections = cm.listSelections(), cursor;
    var i = selections.length;
    while (i--) {
      cursor = selections[i].head;
      kill(cm, cursor, findEnd(cm, cursor, by, dir), ring);
    }
  }