function visitDeclare(traverse, node, path, state) {
  utils.catchupWhiteOut(node.range[1], state);
  return false;
}