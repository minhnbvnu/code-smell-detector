function lastAncestor(node, pred) {
  var ancestors = listAncestor(node);
  return lists.last(ancestors.filter(pred));
}