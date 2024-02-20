function neutralLayerFloating$1(palette, relativeLuminance, layerDelta) {
  const cardIndex = palette.closestIndexOf(baseLayerLuminanceSwatch(relativeLuminance)) - layerDelta;
  return palette.get(cardIndex - layerDelta);
}