function normalizeWheel(event) {
  let deltaX = event.deltaX;
  let deltaY = event.deltaY;

  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
    // delta in LINE units
    deltaX *= LINE_HEIGHT;
    deltaY *= LINE_HEIGHT;
  } else if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    // delta in PAGE units
    deltaX *= PAGE_HEIGHT;
    deltaY *= PAGE_HEIGHT;
  }

  return {
    deltaX,
    deltaY
  };
}