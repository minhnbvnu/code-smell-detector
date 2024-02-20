function findTypeAt(srv, query, file) {
    var type, exprName, exprType;
    var expr = findExpr(file, query);
    var typeResult = findTypeAtExpr(srv, query, file, expr);
    type = typeResult[0];

    if (!type) {
      expr = findExprAround(file, query);
      typeResult = findTypeAtExpr(srv, query, file, expr);
      type = typeResult[0];
    }

    exprName = typeResult[1];
    exprType = typeResult[2];
    var result = {
      guess: infer.didGuess(),
      type: infer.toString(exprType, query.depth),
      name: type && type.name,
      exprName: exprName,
      doc: exprType.doc,
      url: exprType.url
    };
    if (type) storeTypeDocs(query, type, result);
    return clean(result);
  }