function BigIntLiteral(node) {
  const raw = this.getPossibleRaw(node);

  if (!this.format.minified && raw != null) {
    this.token(raw);
    return;
  }

  this.token(node.value + "n");
}