function ensureVar(node, scope) {
    return scope.hasProp(node.name) || cx.topScope.defProp(node.name, node);
  }