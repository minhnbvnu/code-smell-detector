function TSConstructSignatureDeclaration(node) {
  this.word("new");
  this.space();
  this.tsPrintSignatureDeclarationBase(node);
  this.token(";");
}