function calcCharAdvance(char, fontSize, font, unitsPerEm) {
  return isOpenTypeJsReliable(fontSize, font, unitsPerEm) ?
    calcCharAdvanceOpenType(char, fontSize, font, unitsPerEm) :
    calcTextAdvanceCanvas(char, fontSize, font)
}