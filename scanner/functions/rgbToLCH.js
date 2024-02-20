function rgbToLCH(rgb) {
  return labToLCH(rgbToLAB(rgb));
}