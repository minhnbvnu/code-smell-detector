function elementPosition(elem, until) {
  let x = 0
  let y = 0
  let inner = true

  while (elem) {
    let style = getComputedStyle(elem, null)
    if(until && until(elem, style)) break
    x += elem.offsetLeft
    y += elem.offsetTop
    y += getNumericStyleProperty(style, 'border-top-width')
    x += getNumericStyleProperty(style, 'border-left-width')
    if (inner) {
      y += getNumericStyleProperty(style, 'padding-top')
      x += getNumericStyleProperty(style, 'padding-left')
    }
    inner = false
    elem = elem.offsetParent
  }
  return {x: x, y: y}
}