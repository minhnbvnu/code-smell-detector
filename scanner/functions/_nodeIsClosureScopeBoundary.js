function _nodeIsClosureScopeBoundary(node, parentNode) {
  if (node.type === Syntax.Program) {
    return true;
  }

  var parentIsFunction =
    parentNode.type === Syntax.FunctionDeclaration
    || parentNode.type === Syntax.FunctionExpression
    || parentNode.type === Syntax.ArrowFunctionExpression;

  var parentIsCurlylessArrowFunc =
    parentNode.type === Syntax.ArrowFunctionExpression
    && node === parentNode.body;

  return parentIsFunction
         && (node.type === Syntax.BlockStatement || parentIsCurlylessArrowFunc);
}