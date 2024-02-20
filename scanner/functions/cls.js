function cls(line, text, bg, wrap, gutter) {
    var i = cm.lineInfo(line);
    eq(i.textClass, text);
    eq(i.bgClass, bg);
    eq(i.wrapClass, wrap);
    if (typeof i.handle.gutterClass !== 'undefined') {
        eq(i.handle.gutterClass, gutter);
    }
  }