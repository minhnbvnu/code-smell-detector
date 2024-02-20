function getterFnWithEnsureSafeObject(fn, fullExpression) {
  return function(s, l) {
    return fn(s, l, ensureSafeObject, fullExpression);
  };
}