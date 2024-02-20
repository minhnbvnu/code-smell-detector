function TSQualifiedName(node) {
  this.print(node.left, node);
  this.token(".");
  this.print(node.right, node);
}