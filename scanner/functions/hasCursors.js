function hasCursors(cm) {
    var sels = cm.listSelections();
    var given = (arguments.length - 1) / 2;
    if (sels.length != given)
      throw new Failure("expected " + given + " selections, found " + sels.length);
    for (var i = 0, p = 1; i < given; i++, p += 2) {
      eqCursorPos(sels[i].anchor, sels[i].head, "something selected for " + i);
      var head = Pos(arguments[p], arguments[p + 1]);
      eqCharPos(sels[i].head, head, "selection " + i);
    }
  }