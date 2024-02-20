function TSRestType(node) {
  this.token("...");
  this.print(node.typeAnnotation, node);
}