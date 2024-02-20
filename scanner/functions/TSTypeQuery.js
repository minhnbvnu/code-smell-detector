function TSTypeQuery(node) {
  this.word("typeof");
  this.space();
  this.print(node.exprName);
}