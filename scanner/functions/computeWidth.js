function computeWidth (wrapPixels, wrapCount, widthFactor) {
  return wrapPixels || ((0.5 + wrapCount) * widthFactor);
}