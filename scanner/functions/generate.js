function generate(node, key, rootProps) {
  if (!rootProps) {
    return /*#__PURE__*/external_window_React_["createElement"](node.tag, extends_default()({
      key: key
    }, normalizeAttrs(node.attrs)), (node.children || []).map(function (child, index) {
      return generate(child, key + '-' + node.tag + '-' + index);
    }));
  }
  return /*#__PURE__*/external_window_React_["createElement"](node.tag, extends_default()({
    key: key
  }, normalizeAttrs(node.attrs), rootProps), (node.children || []).map(function (child, index) {
    return generate(child, key + '-' + node.tag + '-' + index);
  }));
}