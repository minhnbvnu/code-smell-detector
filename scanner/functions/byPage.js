function byPage(cm, pos, dir) {
    return cm.findPosV(pos, dir, "page", cm.doc.sel.goalColumn);
  }