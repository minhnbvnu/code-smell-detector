function _pBlock (p) {
  let parent = p.parentNode
  let children = p.children
  let L = children.length
  let hasChanged = false
  // doing it reverse so that we don't miss elements due to the ongoing tranformations
  for (var i = L - 1; i >= 0; i--) {
    let child = children[i]
    if (isBlock[child.tagName]) {
      hasChanged = true
      // create a new <p>
      let newP = parent.createElement('p')
      let childPos = p.getChildIndex(child)
      let siblings = p.childNodes.slice(childPos + 1)
      // move all subsequent siblings to the new <p>
      // and insert the block element and the new one after the current <p>
      let pos = parent.getChildIndex(p) + 1
      parent.insertAt(pos, child)
      if (siblings.length > 0 && !_isEmpty(siblings)) {
        newP.append(siblings)
        parent.insertAt(pos + 1, newP)
      }
    }
  }
  // if the original <p> is now empty, remove it
  if (hasChanged && _isEmpty(p.childNodes)) {
    p.parentNode.removeChild(p)
  }
}