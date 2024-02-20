function _isBlankTextNode(node) {
    return node.nodeType === wysihtml5.TEXT_NODE && !wysihtml5.lang.string(node.data).trim();
  }