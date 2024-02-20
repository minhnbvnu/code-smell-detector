function ArrayTypeAnnotation(node) {
  this.print(node.elementType, node);
  this.token("[");
  this.token("]");
}