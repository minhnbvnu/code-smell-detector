function connectPattern(node, scope, source) {
    var connecter = inferPatternVisitor[node.type];
    if (connecter) connecter(node, scope, source);
  }