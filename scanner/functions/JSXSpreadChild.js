function JSXSpreadChild(node) {
  this.token("{");
  this.token("...");
  this.print(node.expression, node);
  this.token("}");
}