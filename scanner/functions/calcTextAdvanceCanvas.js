function calcTextAdvanceCanvas(text, fontSize, font) {
  // need to override newline handling, measureText doesn't handle it correctly (returns a non-zero width)
  if(text === '\n') {
    return 0
  }
  let context = canvasContext()
  context.font = fontSpec(fontSize, font)
  return context.measureText(text).width
}