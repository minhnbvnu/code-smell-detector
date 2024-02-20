function leftButtonStartDrag(cm, e, start, modifier) {
  var display = cm.display, startTime = +new Date;
  var dragEnd = operation(cm, function (e2) {
    if (webkit) { display.scroller.draggable = false; }
    cm.state.draggingText = false;
    off(document, "mouseup", dragEnd);
    off(display.scroller, "drop", dragEnd);
    if (Math.abs(e.clientX - e2.clientX) + Math.abs(e.clientY - e2.clientY) < 10) {
      e_preventDefault(e2);
      if (!modifier && +new Date - 200 < startTime)
        { extendSelection(cm.doc, start); }
      // Work around unexplainable focus problem in IE9 (#2127) and Chrome (#3081)
      if (webkit || ie && ie_version == 9)
        { setTimeout(function () {document.body.focus(); display.input.focus();}, 20); }
      else
        { display.input.focus(); }
    }
  });
  // Let the drag handler handle this.
  if (webkit) { display.scroller.draggable = true; }
  cm.state.draggingText = dragEnd;
  dragEnd.copy = mac ? e.altKey : e.ctrlKey;
  // IE's approach to draggable
  if (display.scroller.dragDrop) { display.scroller.dragDrop(); }
  on(document, "mouseup", dragEnd);
  on(display.scroller, "drop", dragEnd);
}