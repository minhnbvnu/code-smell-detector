function TSInterfaceDeclaration(node) {
  const {
    declare,
    id,
    typeParameters,
    extends: extendz,
    body
  } = node;

  if (declare) {
    this.word("declare");
    this.space();
  }

  this.word("interface");
  this.space();
  this.print(id, node);
  this.print(typeParameters, node);

  if (extendz) {
    this.space();
    this.word("extends");
    this.space();
    this.printList(extendz, node);
  }

  this.space();
  this.print(body, node);
}