function traverseFlat(object, visitor, scopeChain) {
  traverse(object, function(node, scopeChain) {
    switch (node.type) {
      case Syntax.FunctionDeclaration:
      case Syntax.FunctionExpression:
      case Syntax.IfStatement:
      case Syntax.WithStatement:
      case Syntax.SwitchStatement:
      case Syntax.TryStatement:
      case Syntax.WhileStatement:
      case Syntax.DoWhileStatement:
      case Syntax.ForStatement:
      case Syntax.ForInStatement:
        return false;
    }
    return visitor(node, scopeChain);
  }, scopeChain);
}