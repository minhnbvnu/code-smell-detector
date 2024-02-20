function TSExternalModuleReference(node) {
  this.token("require(");
  this.print(node.expression, node);
  this.token(")");
}