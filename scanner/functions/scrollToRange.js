function scrollToRange(cm, range) {
    resolveScrollToPos(cm);
    cm.curOp.scrollToPos = range;
  }