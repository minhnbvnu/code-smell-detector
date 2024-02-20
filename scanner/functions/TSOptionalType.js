function TSOptionalType(node) {
  this.print(node.typeAnnotation, node);
  this.token("?");
}