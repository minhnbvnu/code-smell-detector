function TSMethodSignature(node) {
  this.tsPrintPropertyOrMethodName(node);
  this.tsPrintSignatureDeclarationBase(node);
  this.token(";");
}