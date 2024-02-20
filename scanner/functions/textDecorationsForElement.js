function textDecorationsForElement(node, initialStyle) {
  let decorations
  // this is going to be removed by webkit/blink but could be useful for now
  // https://code.google.com/p/chromium/issues/detail?id=269140
  if(initialStyle.webkitTextDecorationsInEffect) {
    return initialStyle.webkitTextDecorationsInEffect
  }
  // this is simplistic but should generally work ok (does not take into account out of flow and inline level elements)
  // why isn't there a simple way to do this??
  while(node && node.nodeType === Node.ELEMENT_NODE) {
    let style = initialStyle ? initialStyle : getComputedStyle(node, null)
    initialStyle = null
    let nodeDecorations = style.getPropertyValue('text-decoration')
    if(nodeDecorations && nodeDecorations.length > 0 && nodeDecorations !== 'none') {
      if(decorations && decorations.length > 0 && decorations !== 'none') {
        let d = decorations.split(' ')
        d.push(nodeDecorations.split(' '))
        decorations = _.uniq(d).join(' ')
      } else {
        decorations = nodeDecorations
      }
    }
    node = node.parentNode
  }
  return decorations
}