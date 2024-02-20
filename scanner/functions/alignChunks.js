function alignChunks(dv, force) {
    if (!dv.dealigned && !force) return;
    if (!dv.orig.curOp) return dv.orig.operation(function() {
      alignChunks(dv, force);
    });

    dv.dealigned = false;
    var other = dv.mv.left == dv ? dv.mv.right : dv.mv.left;
    if (other) {
      ensureDiff(other);
      other.dealigned = false;
    }
    var linesToAlign = findAlignedLines(dv, other);

    // Clear old aligners
    var aligners = dv.mv.aligners;
    for (var i = 0; i < aligners.length; i++)
      aligners[i].clear();
    aligners.length = 0;

    var cm = [dv.edit, dv.orig], scroll = [], offset = []
    if (other) cm.push(other.orig);
    for (var i = 0; i < cm.length; i++) {
      scroll.push(cm[i].getScrollInfo().top);
      offset.push(-cm[i].getScrollerElement().getBoundingClientRect().top)
    }

    if (offset[0] != offset[1] || cm.length == 3 && offset[1] != offset[2])
      alignLines(cm, offset, [0, 0, 0], aligners)
    for (var ln = 0; ln < linesToAlign.length; ln++)
      alignLines(cm, offset, linesToAlign[ln], aligners);

    for (var i = 0; i < cm.length; i++)
      cm[i].scrollTo(null, scroll[i]);
  }