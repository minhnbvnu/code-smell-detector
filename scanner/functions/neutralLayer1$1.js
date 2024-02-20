function neutralLayer1$1(palette, baseLayerLuminance) {
  return palette.get(palette.closestIndexOf(baseLayerLuminanceSwatch(baseLayerLuminance)));
}