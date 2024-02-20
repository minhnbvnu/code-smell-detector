function standardizeSuperProperty(superProp) {
  if (superProp.parentPath.isAssignmentExpression() && superProp.parentPath.node.operator !== "=") {
    const assignmentPath = superProp.parentPath;
    const op = assignmentPath.node.operator.slice(0, -1);
    const value = assignmentPath.node.right;
    assignmentPath.node.operator = "=";

    if (superProp.node.computed) {
      const tmp = superProp.scope.generateDeclaredUidIdentifier("tmp");
      assignmentPath.get("left").replaceWith(t.memberExpression(superProp.node.object, t.assignmentExpression("=", tmp, superProp.node.property), true));
      assignmentPath.get("right").replaceWith(t.binaryExpression(op, t.memberExpression(superProp.node.object, t.identifier(tmp.name), true), value));
    } else {
      assignmentPath.get("left").replaceWith(t.memberExpression(superProp.node.object, superProp.node.property));
      assignmentPath.get("right").replaceWith(t.binaryExpression(op, t.memberExpression(superProp.node.object, t.identifier(superProp.node.property.name)), value));
    }

    return [assignmentPath.get("left"), assignmentPath.get("right").get("left")];
  } else if (superProp.parentPath.isUpdateExpression()) {
    const updateExpr = superProp.parentPath;
    const tmp = superProp.scope.generateDeclaredUidIdentifier("tmp");
    const computedKey = superProp.node.computed ? superProp.scope.generateDeclaredUidIdentifier("prop") : null;
    const parts = [t.assignmentExpression("=", tmp, t.memberExpression(superProp.node.object, computedKey ? t.assignmentExpression("=", computedKey, superProp.node.property) : superProp.node.property, superProp.node.computed)), t.assignmentExpression("=", t.memberExpression(superProp.node.object, computedKey ? t.identifier(computedKey.name) : superProp.node.property, superProp.node.computed), t.binaryExpression("+", t.identifier(tmp.name), t.numericLiteral(1)))];

    if (!superProp.parentPath.node.prefix) {
      parts.push(t.identifier(tmp.name));
    }

    updateExpr.replaceWith(t.sequenceExpression(parts));
    const left = updateExpr.get("expressions.0.right");
    const right = updateExpr.get("expressions.1.left");
    return [left, right];
  }

  return [superProp];
}