function isTSInterfaceBody(node, opts) {
  if (!node) return false;
  const nodeType = node.type;

  if (nodeType === "TSInterfaceBody") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual.default)(node, opts);
    }
  }

  return false;
}