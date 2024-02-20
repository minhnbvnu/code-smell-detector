function focusOnFirstNode(event, nodes) {
  var node = nodes[0];

  if (node) {
    node.focus();
    event.preventDefault();
  }
}