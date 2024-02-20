function resolveScrollToPos(cm) {
  var range = cm.curOp.scrollToPos;
  if (range) {
    cm.curOp.scrollToPos = null;
    var from = estimateCoords(cm, range.from), to = estimateCoords(cm, range.to);
    var sPos = calculateScrollPos(cm, Math.min(from.left, to.left),
                                  Math.min(from.top, to.top) - range.margin,
                                  Math.max(from.right, to.right),
                                  Math.max(from.bottom, to.bottom) + range.margin);
    cm.scrollTo(sPos.scrollLeft, sPos.scrollTop);
  }
}