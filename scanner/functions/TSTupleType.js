function TSTupleType(node) {
  this.token("[");
  this.printList(node.elementTypes, node);
  this.token("]");
}