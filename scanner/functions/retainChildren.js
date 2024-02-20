function retainChildren (el, ...allowedTagNames) {
  allowedTagNames = new Set(allowedTagNames)
  let childNodes = el.getChildNodes()
  for (let idx = childNodes.length - 1; idx >= 0; idx--) {
    let child = childNodes[idx]
    if (!allowedTagNames.has(child.tagName)) {
      el.removeAt(idx)
    }
  }
  return el
}