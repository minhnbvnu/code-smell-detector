function _isBlockElement(node) {
    return dom.getStyle("display").from(node) === "block";
  }