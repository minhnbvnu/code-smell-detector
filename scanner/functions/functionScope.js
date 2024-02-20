function functionScope(scope, arrow) {
    while (scope.isBlock || scope.isCatch || arrow === false && scope.fnType && scope.fnType.isArrowFn()) scope = scope.prev;

    return scope;
  }