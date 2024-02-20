function contrastRatio(a, b) {
  const luminanceA = rgbToRelativeLuminance(a);
  const luminanceB = rgbToRelativeLuminance(b);
  return luminanceA > luminanceB ? calculateContrastRatio(luminanceA, luminanceB) : calculateContrastRatio(luminanceB, luminanceA);
}