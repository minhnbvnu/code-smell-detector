function ClassPrivateMethod(node) {
  this._classMethodHead(node);

  this.space();
  this.print(node.body, node);
}