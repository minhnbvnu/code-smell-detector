function findRefs(srv, query, file) {
    var expr = findExprOrThrow(file, query, true);

    if (expr && expr.node.type == "Identifier") {
      return findRefsToVariable(srv, query, file, expr);
    } else if (expr && expr.node.type == "MemberExpression" && !expr.node.computed) {
      var p = expr.node.property;
      expr.node = expr.node.object;
      return findRefsToProperty(srv, query, file, expr, p);
    } else if (expr && expr.node.type == "ObjectExpression") {
      var pos = resolvePos(file, query.end);

      for (var i = 0; i < expr.node.properties.length; ++i) {
        var k = expr.node.properties[i].key;
        if (k.start <= pos && k.end >= pos) return findRefsToProperty(srv, query, file, expr, k);
      }
    } else if (expr && expr.node.type == "MethodDefinition") {
      var p = expr.node.key;
      return findRefsToProperty(srv, query, file, expr, p);
    }

    throw ternError("Not at a variable or property name.");
  }