function newText(preset, xOrigin) {
  const text = MSTextLayer.new();
  text.setStringValue_(`${preset.artboardSize}px`)
  const fontManager = NSFontManager.sharedFontManager();
  const boldItalic = fontManager.fontWithFamily_traits_weight_size("Helvetica neue", NSBoldFontMask, 0, artboardParams.titleFontSize)
  text.setFont(boldItalic)
  text.lineHeight = 48
  text.setName(`${preset.artboardSize}px`)
  const textFrame = text.frame();
  textFrame.setX(xOrigin)
  textFrame.setY(-(32 + text.lineHeight()))
  return text
}