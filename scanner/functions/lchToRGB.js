function lchToRGB(lch, alpha = 1) {
  return labToRGB(lchToLAB(lch), alpha);
}