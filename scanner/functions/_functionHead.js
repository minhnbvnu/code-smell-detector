function _functionHead(node) {
  if (node.async) {
    this.word("async");
    this.space();
  }

  this.word("function");
  if (node.generator) this.token("*");
  this.space();

  if (node.id) {
    this.print(node.id, node);
  }

  this._params(node);

  this._predicate(node);
}