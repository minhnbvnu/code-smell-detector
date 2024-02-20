function isDocumentFragment(node) {
    return node.parentNode && node.parentNode.nodeType === 11;
  }