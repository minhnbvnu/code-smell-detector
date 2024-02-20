function selectionChange(cm, sel) {
    updateActiveLines(cm, sel.ranges);
  }