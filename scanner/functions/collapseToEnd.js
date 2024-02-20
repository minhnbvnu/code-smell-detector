function collapseToEnd(node) {
  node.focus();
  const selection = window.getSelection();
  selection.collapseToEnd();
}