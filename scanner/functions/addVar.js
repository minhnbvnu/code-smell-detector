function addVar(scope, nameNode) {
    return scope.defProp(nameNode.name, nameNode);
  }