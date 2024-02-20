function OptionalCallExpression(node) {
  this.print(node.callee, node);
  this.print(node.typeArguments, node);
  this.print(node.typeParameters, node);

  if (node.optional) {
    this.token("?.");
  }

  this.token("(");
  this.printList(node.arguments, node);
  this.token(")");
}