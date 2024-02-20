function killRegion(cm, ring) {
    if (cm.somethingSelected()) {
      var selections = cm.listSelections(), selection;
      var i = selections.length;
      while (i--) {
        selection = selections[i];
        kill(cm, selection.anchor, selection.head, ring);
      }
      return true;
    }
  }