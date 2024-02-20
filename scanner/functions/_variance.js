function _variance(node) {
  if (node.variance) {
    if (node.variance.kind === "plus") {
      this.token("+");
    } else if (node.variance.kind === "minus") {
      this.token("-");
    }
  }
}