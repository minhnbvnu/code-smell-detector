function getNodeSourceText(node, state) {
  return state.g.source.substring(node.range[0], node.range[1]);
}