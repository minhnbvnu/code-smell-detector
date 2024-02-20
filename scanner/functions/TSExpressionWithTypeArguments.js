function TSExpressionWithTypeArguments(node) {
  this.print(node.expression, node);
  this.print(node.typeParameters, node);
}