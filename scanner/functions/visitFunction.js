function visitFunction(traverse, node, path, state) {
  if (node.type === Syntax.Program) {
    state.docBlocksByLine = {};
    state.commentsByLine = {};
    parseComments(node, state);
    return;
  }

  genericFunctionTransformer(traverse, node, path, state);
  return false;
}