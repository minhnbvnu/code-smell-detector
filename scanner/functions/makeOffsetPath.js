function makeOffsetPath(ancestor, node) {
  var ancestors = listAncestor(node, func.eq(ancestor));
  return ancestors.map(dom_position).reverse();
}