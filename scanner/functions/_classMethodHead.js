function _classMethodHead(node) {
  this.printJoin(node.decorators, node);
  this.tsPrintClassMemberModifiers(node, false);

  this._methodHead(node);
}