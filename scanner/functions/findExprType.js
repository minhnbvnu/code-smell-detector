function findExprType(srv, query, file, expr) {
    var type;

    if (expr) {
      infer.resetGuessing();
      type = infer.expressionType(expr);
    }

    var typeHandlers = srv.hasHandler("typeAt");

    if (typeHandlers) {
      var pos = resolvePos(file, query.end);

      for (var i = 0; i < typeHandlers.length; i++) type = typeHandlers[i](file, pos, expr, type);
    }

    if (!type) throw ternError("No type found at the given position.");
    var objProp;

    if (expr.node.type == "ObjectExpression" && query.end != null && (objProp = pointInProp(expr.node, resolvePos(file, query.end)))) {
      var name = objProp.key.name;
      var fromCx = ensureObj(infer.typeFromContext(file.ast, expr));

      if (fromCx && fromCx.hasProp(name)) {
        type = fromCx.hasProp(name);
      } else {
        var fromLocal = ensureObj(type);
        if (fromLocal && fromLocal.hasProp(name)) type = fromLocal.hasProp(name);
      }
    }

    return type;
  }