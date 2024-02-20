function _isContainerEmpty (node, propertyName) {
  let ids = node[propertyName]
  if (ids.length === 0) return true
  if (ids.length > 1) return false
  let doc = node.getDocument()
  let first = doc.get(ids[0])
  return first && first.isText() && !first.getText()
}