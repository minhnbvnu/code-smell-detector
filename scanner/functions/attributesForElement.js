function attributesForElement(node, style) {
  if(_.isUndefined(style)) style = getComputedStyle(node, null)
  let attrs = {}
  let fontWeight = normalizeFontWeight(style.getPropertyValue('font-weight'))
  if (fontWeight === 'bold') {
    attrs[ATTR.BOLD] = true
  }
  if (style.getPropertyValue('font-style') === 'italic') {
    attrs[ATTR.ITALIC] = true
  }
  // vertical align does not inherit, so we need to check ancestors
  let verticalAlign = verticalAlignForElement(node, style)
  if (verticalAlign && verticalAlign === 'super') {
    attrs[ATTR.SUPERSCRIPT] = true
  } else if (verticalAlign === 'sub') {
    attrs[ATTR.SUBSCRIPT] = true
  }
  // text decoration does not inherit, so we need to check ancestors (http://stackoverflow.com/a/1823388/430128)
  let textDecorations = textDecorationsForElement(node, style)
  if (textDecorations && textDecorations.indexOf('underline') > -1) {
    attrs[ATTR.UNDERLINE] = true
  }
  if (textDecorations && textDecorations.indexOf('line-through') > -1) {
    attrs[ATTR.STRIKETHROUGH] = true
  }
  return attrs
}