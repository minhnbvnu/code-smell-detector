function ObjectMethod(node) {
  this.printJoin(node.decorators, node);

  this._methodHead(node);

  this.space();
  this.print(node.body, node);
}