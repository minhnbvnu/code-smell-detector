function calculateScrollPos(cm, x1, y1, x2, y2) {
  var display = cm.display, snapMargin = textHeight(cm.display);
  if (y1 < 0) { y1 = 0; }
  var screentop = cm.curOp && cm.curOp.scrollTop != null ? cm.curOp.scrollTop : display.scroller.scrollTop;
  var screen = displayHeight(cm), result = {};
  if (y2 - y1 > screen) { y2 = y1 + screen; }
  var docBottom = cm.doc.height + paddingVert(display);
  var atTop = y1 < snapMargin, atBottom = y2 > docBottom - snapMargin;
  if (y1 < screentop) {
    result.scrollTop = atTop ? 0 : y1;
  } else if (y2 > screentop + screen) {
    var newTop = Math.min(y1, (atBottom ? docBottom : y2) - screen);
    if (newTop != screentop) { result.scrollTop = newTop; }
  }

  var screenleft = cm.curOp && cm.curOp.scrollLeft != null ? cm.curOp.scrollLeft : display.scroller.scrollLeft;
  var screenw = displayWidth(cm) - (cm.options.fixedGutter ? display.gutters.offsetWidth : 0);
  var tooWide = x2 - x1 > screenw;
  if (tooWide) { x2 = x1 + screenw; }
  if (x1 < 10)
    { result.scrollLeft = 0; }
  else if (x1 < screenleft)
    { result.scrollLeft = Math.max(0, x1 - (tooWide ? 0 : 10)); }
  else if (x2 > screenw + screenleft - 3)
    { result.scrollLeft = x2 + (tooWide ? 0 : 10) - screenw; }
  return result
}