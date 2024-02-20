function _isEmpty (nodes) {
  for (let i = 0; i < nodes.length; i++) {
    let child = nodes[i]
    if (!child.isTextNode() || !(/^\s*$/.exec(child.textContent))) return false
  }
  return true
}