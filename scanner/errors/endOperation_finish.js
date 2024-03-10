function endOperation_finish(op) {
  var cm = op.cm, display = cm.display, doc = cm.doc;

  if (op.updatedDisplay) { postUpdateDisplay(cm, op.update); }

  // Abort mouse wheel delta measurement, when scrolling explicitly
  if (display.wheelStartX != null && (op.scrollTop != null || op.scrollLeft != null || op.scrollToPos))
    { display.wheelStartX = display.wheelStartY = null; }

  // Propagate the scroll position to the actual DOM scroller
  if (op.scrollTop != null && (display.scroller.scrollTop != op.scrollTop || op.forceScroll)) {
    doc.scrollTop = Math.max(0, Math.min(display.scroller.scrollHeight - display.scroller.clientHeight, op.scrollTop));
    display.scrollbars.setScrollTop(doc.scrollTop);
    display.scroller.scrollTop = doc.scrollTop;
  }
  if (op.scrollLeft != null && (display.scroller.scrollLeft != op.scrollLeft || op.forceScroll)) {
    doc.scrollLeft = Math.max(0, Math.min(display.scroller.scrollWidth - display.scroller.clientWidth, op.scrollLeft));
    display.scrollbars.setScrollLeft(doc.scrollLeft);
    display.scroller.scrollLeft = doc.scrollLeft;
    alignHorizontally(cm);
  }
  // If we need to scroll a specific position into view, do so.
  if (op.scrollToPos) {
    var coords = scrollPosIntoView(cm, clipPos(doc, op.scrollToPos.from),
                                   clipPos(doc, op.scrollToPos.to), op.scrollToPos.margin);
    if (op.scrollToPos.isCursor && cm.state.focused) { maybeScrollWindow(cm, coords); }
  }

  // Fire events for markers that are hidden/unidden by editing or
  // undoing
  var hidden = op.maybeHiddenMarkers, unhidden = op.maybeUnhiddenMarkers;
  if (hidden) { for (var i = 0; i < hidden.length; ++i)
    { if (!hidden[i].lines.length) { signal(hidden[i], "hide"); } } }
  if (unhidden) { for (var i$1 = 0; i$1 < unhidden.length; ++i$1)
    { if (unhidden[i$1].lines.length) { signal(unhidden[i$1], "unhide"); } } }

  if (display.wrapper.offsetHeight)
    { doc.scrollTop = cm.display.scroller.scrollTop; }

  // Fire change events, and delayed event handlers
  if (op.changeObjs)
    { signal(cm, "changes", cm, op.changeObjs); }
  if (op.update)
    { op.update.finish(); }
}