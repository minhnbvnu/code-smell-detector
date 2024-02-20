function elementHasNonIgnoredSiblingElement(el) {
  let sibling = el.nextSibling
  while (sibling) {
    if (ignoredNode(sibling) || sibling.nodeName === 'BR') {
      sibling = sibling.nextSibling
    } else if (sibling.nodeType === Node.ELEMENT_NODE) {
      return true
    } else {
      sibling = sibling.nextSibling
    }
  }
  return false
}