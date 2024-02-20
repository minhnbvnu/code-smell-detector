function NullableTypeAnnotation(node) {
  this.token("?");
  this.print(node.typeAnnotation, node);
}