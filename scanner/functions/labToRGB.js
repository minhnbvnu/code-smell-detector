function labToRGB(lab, alpha = 1) {
  return xyzToRGB(labToXYZ(lab), alpha);
}