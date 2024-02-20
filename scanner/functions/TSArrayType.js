function TSArrayType(node) {
  this.print(node.elementType, node);
  this.token("[]");
}