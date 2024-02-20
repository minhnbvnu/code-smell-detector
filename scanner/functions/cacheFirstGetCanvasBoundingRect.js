function cacheFirstGetCanvasBoundingRect(canvas) {
  if (canvasBoundingRectCache && canvas.width === canvasBoundingRectCache.width && canvas.height === canvasBoundingRectCache.height) {
    return canvasBoundingRectCache.rect;
  }

  canvasBoundingRectCache = {
    width: canvas.width,
    height: canvas.height,
    rect: canvas.getBoundingClientRect()
  };
  return canvasBoundingRectCache.rect;
}