function jqLiteWrapNode(node, wrapper) {
  var parent = node.parentNode;

  if (parent) {
    parent.replaceChild(wrapper, node);
  }

  wrapper.appendChild(node);
}