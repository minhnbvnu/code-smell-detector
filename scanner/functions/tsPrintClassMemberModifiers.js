function tsPrintClassMemberModifiers(node, isField) {
  if (isField && node.declare) {
    this.word("declare");
    this.space();
  }

  if (node.accessibility) {
    this.word(node.accessibility);
    this.space();
  }

  if (node.static) {
    this.word("static");
    this.space();
  }

  if (node.abstract) {
    this.word("abstract");
    this.space();
  }

  if (isField && node.readonly) {
    this.word("readonly");
    this.space();
  }
}