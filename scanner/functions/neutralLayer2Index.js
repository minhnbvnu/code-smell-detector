function neutralLayer2Index(palette, luminance, layerDelta, fillRestDelta, fillHoverDelta, fillActiveDelta) {
  return Math.max(palette.closestIndexOf(baseLayerLuminanceSwatch(luminance)) + layerDelta, fillRestDelta, fillHoverDelta, fillActiveDelta);
}