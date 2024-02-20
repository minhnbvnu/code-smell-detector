function UnionTypeAnnotation(node) {
  this.printJoin(node.types, node, {
    separator: orSeparator
  });
}