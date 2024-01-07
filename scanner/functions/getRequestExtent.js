function getRequestExtent(extent, resolution, pixelRatio, ratio) {
  const imageResolution = resolution / pixelRatio;
  const center = getCenter(extent);
  const viewWidth = ceil(getWidth(extent) / imageResolution, DECIMALS);
  const viewHeight = ceil(getHeight(extent) / imageResolution, DECIMALS);
  const marginWidth = ceil(((ratio - 1) * viewWidth) / 2, DECIMALS);
  const requestWidth = viewWidth + 2 * marginWidth;
  const marginHeight = ceil(((ratio - 1) * viewHeight) / 2, DECIMALS);
  const requestHeight = viewHeight + 2 * marginHeight;
  return getForViewAndSize(center, imageResolution, 0, [
    requestWidth,
    requestHeight,
  ]);
}