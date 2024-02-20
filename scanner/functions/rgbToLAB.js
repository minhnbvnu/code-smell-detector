function rgbToLAB(rgb) {
  return xyzToLAB(rgbToXYZ(rgb));
}