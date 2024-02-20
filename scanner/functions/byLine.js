function byLine(cm, pos, dir) {
    return cm.findPosV(pos, dir, "line", cm.doc.sel.goalColumn);
  }