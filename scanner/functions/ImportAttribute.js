function ImportAttribute(node) {
  this.print(node.key);
  this.token(":");
  this.space();
  this.print(node.value);
}