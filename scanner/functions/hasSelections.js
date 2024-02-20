function hasSelections(cm) {
    var sels = cm.listSelections();
    var given = (arguments.length - 1) / 4;
    if (sels.length != given)
      throw new Failure("expected " + given + " selections, found " + sels.length);
    for (var i = 0, p = 1; i < given; i++, p += 4) {
      var anchor = Pos(arguments[p], arguments[p + 1]);
      var head = Pos(arguments[p + 2], arguments[p + 3]);
      eqCharPos(sels[i].anchor, anchor, "anchor of selection " + i);
      eqCharPos(sels[i].head, head, "head of selection " + i);
    }
  }