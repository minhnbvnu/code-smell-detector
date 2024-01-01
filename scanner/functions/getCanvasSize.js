function getCanvasSize (canvasEl, embedded, maxSize, isVR) {
  if (!canvasEl.parentElement) { return {height: 0, width: 0}; }
  if (embedded) {
    var size;
    size = {
      height: canvasEl.parentElement.offsetHeight,
      width: canvasEl.parentElement.offsetWidth
    };
    return constrainSizeTo(size, maxSize);
  }
  return getMaxSize(maxSize, isVR);
}