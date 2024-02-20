function DeclareInterface(node) {
  this.word("declare");
  this.space();
  this.InterfaceDeclaration(node);
}