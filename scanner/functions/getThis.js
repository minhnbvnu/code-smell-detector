function getThis(scope) {
    var fnScope = functionScope(scope);
    return fnScope.fnType ? fnScope.fnType.self : fnScope;
  }