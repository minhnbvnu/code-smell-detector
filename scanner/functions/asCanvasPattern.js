function asCanvasPattern(pattern) {
  if (!pattern.offset || !pattern.size) {
    return iconCache.getPattern(pattern.src, 'anonymous', pattern.color);
  }

  const cacheKey = pattern.src + ':' + pattern.offset;

  const canvasPattern = iconCache.getPattern(
    cacheKey,
    undefined,
    pattern.color,
  );
  if (canvasPattern) {
    return canvasPattern;
  }

  const iconImage = iconCache.get(pattern.src, 'anonymous', null);
  if (iconImage.getImageState() !== ImageState.LOADED) {
    return null;
  }
  const patternCanvasContext = createCanvasContext2D(
    pattern.size[0],
    pattern.size[1],
  );
  patternCanvasContext.drawImage(
    iconImage.getImage(1),
    pattern.offset[0],
    pattern.offset[1],
    pattern.size[0],
    pattern.size[1],
    0,
    0,
    pattern.size[0],
    pattern.size[1],
  );
  getIconImage(
    patternCanvasContext.canvas,
    cacheKey,
    undefined,
    ImageState.LOADED,
    pattern.color,
    true,
  );
  return iconCache.getPattern(cacheKey, undefined, pattern.color);
}