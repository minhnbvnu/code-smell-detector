function TSExportAssignment(node) {
  this.word("export");
  this.space();
  this.token("=");
  this.space();
  this.print(node.expression, node);
  this.token(";");
}