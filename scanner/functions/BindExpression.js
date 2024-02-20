function BindExpression(node) {
  this.print(node.object, node);
  this.token("::");
  this.print(node.callee, node);
}