function _methodHead(node) {
  const kind = node.kind;
  const key = node.key;

  if (kind === "get" || kind === "set") {
    this.word(kind);
    this.space();
  }

  if (node.async) {
    this._catchUp("start", key.loc);

    this.word("async");
    this.space();
  }

  if (kind === "method" || kind === "init") {
    if (node.generator) {
      this.token("*");
    }
  }

  if (node.computed) {
    this.token("[");
    this.print(key, node);
    this.token("]");
  } else {
    this.print(key, node);
  }

  if (node.optional) {
    this.token("?");
  }

  this._params(node);
}