function nextLine(iter) {
    if (iter.line >= iter.max) return;
    iter.ch = 0;
    iter.text = iter.cm.getLine(++iter.line);
    return true;
  }