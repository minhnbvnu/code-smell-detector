function findTypeAtExpr(srv, query, file, expr) {
    var exprName, exprType;
    var type = findExprType(srv, query, file, expr),
        exprType = type;
    if (query.preferFunction) type = type.getFunctionType() || type.getType();else type = type.getType();

    if (expr) {
      if (expr.node.type == "Identifier") exprName = expr.node.name;else if (expr.node.type == "MemberExpression" && !expr.node.computed) exprName = expr.node.property.name;else if (expr.node.type == "MethodDefinition" && !expr.node.computed) exprName = expr.node.key.name;
    }

    if (query.depth != null && typeof query.depth != "number") throw ternError(".query.depth must be a number");
    return [type, exprName, exprType];
  }