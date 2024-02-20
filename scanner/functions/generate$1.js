function generate$1(node2) {
    this.token(Function$1, "style(");
    this.token(Ident, node2.name);
    if (node2.value !== null) {
      this.token(Colon, ":");
      this.node(node2.value);
    }
    this.token(RightParenthesis, ")");
  }