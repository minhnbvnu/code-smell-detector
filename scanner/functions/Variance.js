function Variance(node) {
  if (node.kind === "plus") {
    this.token("+");
  } else {
    this.token("-");
  }
}