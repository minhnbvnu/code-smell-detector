function indentEdge(edge, level) {
  indent.inBetween(edge.startToken, edge.endToken, edge.level || level);
}