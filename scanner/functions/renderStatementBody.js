function renderStatementBody(traverse, node, path, state) {
  traverse(node.body, path, state);
  utils.catchup(node.body.range[1], state);
}