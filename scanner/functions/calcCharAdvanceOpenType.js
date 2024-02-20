function calcCharAdvanceOpenType(char, fontSize, font, unitsPerEm) {
  let glyph = font.charToGlyph(char)
  return glyph.unicode ?
    glyph.advanceWidth * calcFontScale(fontSize, unitsPerEm) :
    // font doesn't contain a glyph for this char, fallback to canvas measurement
    calcTextAdvanceCanvas(char, fontSize, font)
}