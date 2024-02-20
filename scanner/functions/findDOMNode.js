function findDOMNode(node) {
  if (node instanceof HTMLElement) {
    return node;
  }
  return _reactDom["default"].findDOMNode(node);
}