function TSImportType(node) {
  const {
    argument,
    qualifier,
    typeParameters
  } = node;
  this.word("import");
  this.token("(");
  this.print(argument, node);
  this.token(")");

  if (qualifier) {
    this.token(".");
    this.print(qualifier, node);
  }

  if (typeParameters) {
    this.print(typeParameters, node);
  }
}