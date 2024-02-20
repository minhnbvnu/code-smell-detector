function findDocs(srv, query, file) {
    var expr = findExpr(file, query);
    var type = findExprType(srv, query, file, expr);
    var inner = type.getType();

    if (!inner) {
      expr = findExprAround(file, query);
      type = findExprType(srv, query, file, expr);
      inner = type.getType();
    }

    var result = {
      url: type.url,
      doc: parseDoc(query, type.doc),
      type: infer.toString(type)
    };
    if (inner) storeTypeDocs(query, inner, result);
    return clean(result);
  }