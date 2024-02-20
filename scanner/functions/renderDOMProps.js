function renderDOMProps (node) {
  var props = node.data.domProps;
  var res = '';

  var parent = node.parent;
  while (isDef(parent)) {
    if (parent.data && parent.data.domProps) {
      props = Object.assign({}, props, parent.data.domProps);
    }
    parent = parent.parent;
  }

  if (isUndef(props)) {
    return res
  }

  var attrs = node.data.attrs;
  for (var key in props) {
    if (key === 'innerHTML') {
      setText(node, props[key], true);
    } else if (key === 'textContent') {
      setText(node, props[key], false);
    } else {
      var attr = propsToAttrMap[key] || key.toLowerCase();
      if (isRenderableAttr(attr) &&
        // avoid rendering double-bound props/attrs twice
        !(isDef(attrs) && isDef(attrs[attr]))
      ) {
        res += renderAttr(attr, props[key]);
      }
    }
  }
  return res
}