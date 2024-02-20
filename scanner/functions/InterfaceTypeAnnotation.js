function InterfaceTypeAnnotation(node) {
  this.word("interface");

  if (node.extends && node.extends.length) {
    this.space();
    this.word("extends");
    this.space();
    this.printList(node.extends, node);
  }

  this.space();
  this.print(node.body, node);
}