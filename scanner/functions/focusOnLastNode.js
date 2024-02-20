function focusOnLastNode(event, nodes) {
  var node = nodes[nodes.length - 1];

  if (node) {
    node.focus();
    event.preventDefault();
  }
}