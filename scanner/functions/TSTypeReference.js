function TSTypeReference(node) {
  this.print(node.typeName, node);
  this.print(node.typeParameters, node);
}