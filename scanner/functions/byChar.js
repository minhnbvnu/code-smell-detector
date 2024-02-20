function byChar(cm, pos, dir) {
    return cm.findPosH(pos, dir, "char", true);
  }