function tsPrintFunctionOrConstructorType(node) {
  const {
    typeParameters,
    parameters
  } = node;
  this.print(typeParameters, node);
  this.token("(");

  this._parameters(parameters, node);

  this.token(")");
  this.space();
  this.token("=>");
  this.space();
  this.print(node.typeAnnotation.typeAnnotation, node);
}