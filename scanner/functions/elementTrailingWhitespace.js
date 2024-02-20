function elementTrailingWhitespace(el) {
  let style = getComputedStyle(el, null)
  let display = style.getPropertyValue('display')

  let lastNotIgnoredChild = () => {
    for(let i = el.children.length - 1; i >= 0; i--) {
      let n = el.children[i]
      if(!ignoredNode(n)) return n
    }
    return null
  }

  if(display === 'inline') {
    let last = lastNotIgnoredChild()
    if(last && last.nodeType === Node.ELEMENT_NODE) {
      let lastChunks = []
      innerRichText(last, lastChunks)
      return elementTrailingWhitespace(last, lastChunks)
    } else {
      return ''
    }
  } else if(display === 'inline-block'
    || display === 'inline-table'
    || display === 'none'
    || display === 'table-column'
    || display === 'table-column-group') {
    return ''
  } else if(display === 'table-cell') {
    return '\t'
  } else {
    let elChunks = []
    innerRichText(el, elChunks)
    if(elChunks && elChunks.length > 0) {
      let marginBottom = getPixelStyleProperty(style, 'margin-bottom')
      let fontSize = getPixelStyleProperty(style, 'font-size')
      if(marginBottom >= fontSize / 2) return '\n\n'
      else return '\n'
    } else return ''
  }
}