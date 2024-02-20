function getSuperBinding(thisEnvFn) {
  return getBinding(thisEnvFn, "supercall", () => {
    const argsBinding = thisEnvFn.scope.generateUidIdentifier("args");
    return t.arrowFunctionExpression([t.restElement(argsBinding)], t.callExpression(t.super(), [t.spreadElement(t.identifier(argsBinding.name))]));
  });
}