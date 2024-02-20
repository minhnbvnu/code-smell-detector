function setStyle(el, style, preserveWhitespace) {
  if (preserveWhitespace) {
    style.whiteSpace = 'pre-wrap'
  }
  let cssString = CSSPropertyOperations.createMarkupForStyles(style)
  el.setAttribute('style', cssString)
}