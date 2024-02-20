function TSParenthesizedType(node) {
  this.token("(");
  this.print(node.typeAnnotation, node);
  this.token(")");
}