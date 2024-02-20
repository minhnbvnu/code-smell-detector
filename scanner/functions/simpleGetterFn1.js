function simpleGetterFn1(key0, fullExp) {
  ensureSafeMemberName(key0, fullExp);

  return function simpleGetterFn1(scope, locals) {
    if (scope == null) return undefined;
    return ((locals && locals.hasOwnProperty(key0)) ? locals : scope)[key0];
  };
}