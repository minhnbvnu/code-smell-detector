function _openTag (el) {
  let attribStr = DomUtils.formatAttribs(el)
  if (attribStr) {
    return `<${el.tagName} ${attribStr}>`
  } else {
    return `<${el.tagName}>`
  }
}