function calcSuperSubFontSize(fontSize, minFontSize) {
  let superSubFontSize = Math.round(fontSize * SUPER_SUB_FONT_RATIO)
  return superSubFontSize > minFontSize ? superSubFontSize : minFontSize
}