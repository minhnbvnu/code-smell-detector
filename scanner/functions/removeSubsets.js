function removeSubsets(nodes) {
  var idx = nodes.length;
  /*
   * Check if each node (or one of its ancestors) is already contained in the
   * array.
   */
  while (--idx >= 0) {
    var node = nodes[idx];
    /*
     * Remove the node if it is not unique.
     * We are going through the array from the end, so we only
     * have to check nodes that preceed the node under consideration in the array.
     */
    if (idx > 0 && nodes.lastIndexOf(node, idx - 1) >= 0) {
      nodes.splice(idx, 1);
      continue;
    }
    for (var ancestor = node.parent; ancestor; ancestor = ancestor.parent) {
      if (nodes.includes(ancestor)) {
        nodes.splice(idx, 1);
        break;
      }
    }
  }
  return nodes;
}