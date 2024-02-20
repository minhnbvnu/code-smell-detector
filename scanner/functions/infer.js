function infer(node, scope, out, name) {
    var handler = inferExprVisitor[node.type];
    return handler ? handler(node, scope, out, name) : ANull;
  }