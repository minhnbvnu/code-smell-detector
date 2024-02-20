function tapTouchEnd(e) {
  //console.log('touchend ' + Date.now());
  if (tapIgnoreEvent(e)) return;

  tapEnableTouchEvents();
  if (!tapHasPointerMoved(e)) {
    tapClick(e);

    if (isSelectOrOption(e.target.tagName)) {
      e.preventDefault();
    }
  }

  tapLastTouchTarget = e.target;
  tapTouchCancel();
}