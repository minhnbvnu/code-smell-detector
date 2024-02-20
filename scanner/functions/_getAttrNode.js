function _getAttrNode(element, attribute) {
    var node = element.getAttributeNode(attribute);
    return node ? node.value : '';
  }