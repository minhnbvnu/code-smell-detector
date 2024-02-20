function TSEnumMember(node) {
  const {
    id,
    initializer
  } = node;
  this.print(id, node);

  if (initializer) {
    this.space();
    this.token("=");
    this.space();
    this.print(initializer, node);
  }

  this.token(",");
}