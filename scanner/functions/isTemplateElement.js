function isTemplateElement(node, opts) {
  if (!node) return false;
  const nodeType = node.type;

  if (nodeType === "TemplateElement") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual.default)(node, opts);
    }
  }

  return false;
}