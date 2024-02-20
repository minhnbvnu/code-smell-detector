function neutralLayerCardContainer$1(palette, relativeLuminance, layerDelta) {
  return palette.get(palette.closestIndexOf(baseLayerLuminanceSwatch(relativeLuminance)) + layerDelta);
}