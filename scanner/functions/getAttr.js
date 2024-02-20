function getAttr (rootEl, selector, attr) {
  let el = rootEl.find(selector)
  if (el) {
    return el.attr(attr)
  } else {
    return ''
  }
}