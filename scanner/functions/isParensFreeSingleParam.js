function isParensFreeSingleParam(node, state) {
  return node.params.length === 1 &&
    state.g.source[state.g.position] !== '(';
}