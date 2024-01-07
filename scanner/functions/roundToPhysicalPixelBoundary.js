function roundToPhysicalPixelBoundary(virtualPixelPosition) {
  const virtualPixelsPerPhysicalPixel = 1 / window.devicePixelRatio;
  return (
    Math.round(virtualPixelPosition / virtualPixelsPerPhysicalPixel) *
    virtualPixelsPerPhysicalPixel
  );
}