function TSTypeParameterInstantiation(node) {
  this.token("<");
  this.printList(node.params, node, {});
  this.token(">");
}