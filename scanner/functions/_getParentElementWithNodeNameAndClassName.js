function _getParentElementWithNodeNameAndClassName(node, nodeName, className, classRegExp, levels) {
    while (levels-- && node && node.nodeName !== "BODY") {
      if (_isElement(node) &&
          _isSameNodeName(node.nodeName, nodeName) &&
          _hasClassName(node, className, classRegExp)) {
        return node;
      }
      node = node.parentNode;
    }
    return null;
  }