function neutralLayer4$1(palette, luminance, layerDelta, fillRestDelta, fillHoverDelta, fillActiveDelta) {
  return palette.get(neutralLayer2Index(palette, luminance, layerDelta, fillRestDelta, fillHoverDelta, fillActiveDelta) + layerDelta * 2);
}