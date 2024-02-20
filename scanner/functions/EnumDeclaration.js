function EnumDeclaration(node) {
  const {
    id,
    body
  } = node;
  this.word("enum");
  this.space();
  this.print(id, node);
  this.print(body, node);
}