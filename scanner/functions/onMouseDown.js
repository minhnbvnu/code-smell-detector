function onMouseDown(e) {
  var cm = this, display = cm.display;
  if (signalDOMEvent(cm, e) || display.activeTouch && display.input.supportsTouch()) { return }
  display.input.ensurePolled();
  display.shift = e.shiftKey;

  if (eventInWidget(display, e)) {
    if (!webkit) {
      // Briefly turn off draggability, to allow widgets to do
      // normal dragging things.
      display.scroller.draggable = false;
      setTimeout(function () { return display.scroller.draggable = true; }, 100);
    }
    return
  }
  if (clickInGutter(cm, e)) { return }
  var start = posFromMouse(cm, e);
  window.focus();

  switch (e_button(e)) {
  case 1:
    // #3261: make sure, that we're not starting a second selection
    if (cm.state.selectingText)
      { cm.state.selectingText(e); }
    else if (start)
      { leftButtonDown(cm, e, start); }
    else if (e_target(e) == display.scroller)
      { e_preventDefault(e); }
    break
  case 2:
    if (webkit) { cm.state.lastMiddleDown = +new Date; }
    if (start) { extendSelection(cm.doc, start); }
    setTimeout(function () { return display.input.focus(); }, 20);
    e_preventDefault(e);
    break
  case 3:
    if (captureRightClick) { onContextMenu(cm, e); }
    else { delayBlurEvent(cm); }
    break
  }
}