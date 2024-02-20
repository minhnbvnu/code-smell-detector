function findRefsToProperty(srv, query, sourceFile, expr, prop) {
    var exprType = infer.expressionType(expr);

    if (expr.node.type == "MethodDefinition") {
      exprType = exprType.propertyOf;
    }

    var objType = exprType.getObjType();
    if (!objType) throw ternError("Couldn't determine type of base object.");
    var refs = [];

    function storeRef(file) {
      return function (node) {
        refs.push({
          file: file.name,
          start: outputPos(query, file, node.start),
          end: outputPos(query, file, node.end)
        });
      };
    }

    if (query.onlySourceFile) {
      infer.findPropRefs(sourceFile.ast, sourceFile.scope, objType, prop.name, storeRef(sourceFile));
    } else {
      for (var i = 0; i < srv.files.length; ++i) {
        var cur = srv.files[i];
        infer.findPropRefs(cur.ast, cur.scope, objType, prop.name, storeRef(cur));
      }
    }

    return {
      refs: refs,
      name: prop.name
    };
  }