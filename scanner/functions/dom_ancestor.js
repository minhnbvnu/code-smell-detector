function dom_ancestor(node, pred) {
  while (node) {
    if (pred(node)) {
      return node;
    }

    if (isEditable(node)) {
      break;
    }

    node = node.parentNode;
  }

  return null;
}