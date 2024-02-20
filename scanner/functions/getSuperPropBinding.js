function getSuperPropBinding(thisEnvFn, isAssignment, propName) {
  const op = isAssignment ? "set" : "get";
  return getBinding(thisEnvFn, `superprop_${op}:${propName || ""}`, () => {
    const argsList = [];
    let fnBody;

    if (propName) {
      fnBody = t.memberExpression(t.super(), t.identifier(propName));
    } else {
      const method = thisEnvFn.scope.generateUidIdentifier("prop");
      argsList.unshift(method);
      fnBody = t.memberExpression(t.super(), t.identifier(method.name), true);
    }

    if (isAssignment) {
      const valueIdent = thisEnvFn.scope.generateUidIdentifier("value");
      argsList.push(valueIdent);
      fnBody = t.assignmentExpression("=", fnBody, t.identifier(valueIdent.name));
    }

    return t.arrowFunctionExpression(argsList, fnBody);
  });
}