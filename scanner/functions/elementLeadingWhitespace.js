function elementLeadingWhitespace(el) {
  let style = getComputedStyle(el, null)
  let display = style.getPropertyValue('display')

  let firstNotIgnoredChild = () => {
    for(let i = 0; i < el.children.length; i++) {
      let n = el.children[i]
      if(!ignoredNode(n)) return n
    }
    return null
  }

  if(display === 'inline') {
    let first = firstNotIgnoredChild()
    if(first && first.nodeType === Node.ELEMENT_NODE) {
      return elementLeadingWhitespace(first)
    } else {
      return ''
    }
  } else if(display === 'inline-block'
    || display === 'inline-table'
    || display === 'none'
    || display === 'table-cell'
    || display === 'table-column'
    || display === 'table-column-group') {
    return ''
  } else {
    return '\n'
  }
}