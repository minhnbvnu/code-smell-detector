function scaleMouseDragAutoscrollDelta(delta) {
  return Math.pow(delta / 3, 3) / 280;
}