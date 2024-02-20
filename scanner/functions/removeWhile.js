function removeWhile(node, pred) {
  while (node) {
    if (isEditable(node) || !pred(node)) {
      break;
    }

    var parent = node.parentNode;
    remove(node);
    node = parent;
  }
}