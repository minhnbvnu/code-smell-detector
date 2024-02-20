function normalScope(scope) {
    while (scope.isCatch) scope = scope.prev;
    return scope;
  }