function TSDeclareFunction(node) {
  if (node.declare) {
    this.word("declare");
    this.space();
  }

  this._functionHead(node);

  this.token(";");
}