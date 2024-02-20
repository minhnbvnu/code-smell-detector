function _handleText(oldNode) {
    return oldNode.ownerDocument.createTextNode(oldNode.data);
  }