function TSInferType(node) {
  this.token("infer");
  this.space();
  this.print(node.typeParameter);
}