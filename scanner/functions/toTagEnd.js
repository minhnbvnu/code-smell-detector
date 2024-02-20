function toTagEnd(iter) {
    for (;;) {
      var gt = iter.text.indexOf(">", iter.ch);
      if (gt == -1) { if (nextLine(iter)) continue; else return; }
      if (!tagAt(iter, gt + 1)) { iter.ch = gt + 1; continue; }
      var lastSlash = iter.text.lastIndexOf("/", gt);
      var selfClose = lastSlash > -1 && !/\S/.test(iter.text.slice(lastSlash + 1, gt));
      iter.ch = gt + 1;
      return selfClose ? "selfClose" : "regular";
    }
  }