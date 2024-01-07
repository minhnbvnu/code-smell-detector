function ceilToPhysicalPixelBoundary(virtualPixelPosition) {
  const virtualPixelsPerPhysicalPixel = 1 / window.devicePixelRatio;
  return (
    Math.ceil(virtualPixelPosition / virtualPixelsPerPhysicalPixel) *
    virtualPixelsPerPhysicalPixel
  );
}