function generate$2(node2) {
    if (typeof node2.name === "string") {
      this.token(Ident, node2.name);
    }
    this.children(node2);
  }