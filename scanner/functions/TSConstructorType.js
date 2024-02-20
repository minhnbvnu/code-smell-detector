function TSConstructorType(node) {
  this.word("new");
  this.space();
  this.tsPrintFunctionOrConstructorType(node);
}