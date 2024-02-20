function byWord(cm, pos, dir) {
    return cm.findPosH(pos, dir, "word", true);
  }