function isJSXNamespacedName(node, opts) {
  if (!node) return false;
  const nodeType = node.type;

  if (nodeType === "JSXNamespacedName") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual.default)(node, opts);
    }
  }

  return false;
}