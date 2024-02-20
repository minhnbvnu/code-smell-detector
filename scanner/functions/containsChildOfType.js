function containsChildOfType(node, type) {
  return containsChildMatching(node, function(node) {
    return node.type === type;
  });
}