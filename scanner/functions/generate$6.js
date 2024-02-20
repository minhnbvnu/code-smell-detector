function generate$6(node2) {
    this.token(Function, `${node2.name}(`);
    this.node(node2.expression);
    this.token(RightParenthesis, ")");
  }