function TSIndexSignature(node) {
  const {
    readonly
  } = node;

  if (readonly) {
    this.word("readonly");
    this.space();
  }

  this.token("[");

  this._parameters(node.parameters, node);

  this.token("]");
  this.print(node.typeAnnotation, node);
  this.token(";");
}