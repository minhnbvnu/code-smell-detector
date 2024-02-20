function visitInterfaceDeclaration(traverse, node, path, state) {
  utils.catchupWhiteOut(node.range[1], state);
  return false;
}