function isConfirmedHookDeclaration(path) {
  const nodeInit = path.node.init;

  if (nodeInit == null || nodeInit.type !== AST_NODE_TYPES.CALL_EXPRESSION) {
    return false;
  }

  const callee = nodeInit.callee;
  return isHook(callee);
}