function isShiftDown(e) {
  if (!e.originalEvent) return false;
  return e.originalEvent.shiftKey === true;
}