function StaticBlock(node) {
  this.word("static");
  this.space();
  this.token("{");

  if (node.body.length === 0) {
    this.token("}");
  } else {
    this.newline();
    this.printSequence(node.body, node, {
      indent: true
    });
    this.rightBrace();
  }
}