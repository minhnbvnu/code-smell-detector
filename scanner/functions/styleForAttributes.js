function styleForAttributes(attributes) {
  let hasAttribute = hasAttributeFor(attributes)

  let style = {}
  let superscript = hasAttribute(ATTR.SUPERSCRIPT)
  let subscript = hasAttribute(ATTR.SUBSCRIPT)
  if(superscript || subscript) {
    style.verticalAlign = classNames({
      super: superscript,
      sub: subscript
    })
  }

  // font size, weight, style
  //let fontSize = this.fontSizeFromAttributes(this.props.fontSize, attributes)

  if(hasAttribute(ATTR.BOLD)) {
    style.fontWeight = 'bold'
  }
  if(hasAttribute(ATTR.ITALIC)) {
    style.fontStyle = 'italic'
  }

  // text-decoration
  let underline = hasAttribute(ATTR.UNDERLINE)
  let strikethrough = hasAttribute(ATTR.STRIKETHROUGH)

  if(underline || strikethrough) {
    style.textDecoration = classNames({
      underline: underline,
      'line-through': strikethrough
    })
  }

  return style
}