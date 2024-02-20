function calcFontSizeFromAttributes(fontSize, minFontSize, attributes) {
  let hasAttribute = hasAttributeFor(attributes)

  // superscript and subscript affect the font size
  let superscript = hasAttribute(ATTR.SUPERSCRIPT)
  let subscript = hasAttribute(ATTR.SUBSCRIPT)

  return superscript || subscript ? calcSuperSubFontSize(fontSize, minFontSize) : fontSize
}