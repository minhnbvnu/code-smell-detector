function _printElement (el, level, maxLevel) {
  let INDENT = new Array(level - 1)
  INDENT.fill('  ')
  INDENT = INDENT.join('')

  if (el.isElementNode()) {
    if (level <= maxLevel) {
      let res = []
      res.push(INDENT + _openTag(el))
      res = res.concat(
        el.childNodes.map((child) => {
          return _printElement(child, level + 1, maxLevel)
        }).filter(Boolean)
      )
      res.push(INDENT + _closeTag(el))
      return res.join('\n')
    } else {
      return INDENT + _openTag(el) + '...' + _closeTag(el)
    }
  } else if (el.isTextNode()) {
    let textContent = el.textContent
    if (/^\s*$/.exec(textContent)) {
      return ''
    } else {
      return INDENT + JSON.stringify(el.textContent)
    }
  } else {
    // TODO: render other node types and consider maxLevel
    return INDENT + el.serialize()
  }
}