function findDef(srv, query, file) {
    var expr = findExpr(file, query);
    var type = findExprType(srv, query, file, expr);
    if (infer.didGuess()) return {};
    var span = getSpan(type);
    var result = {
      url: type.url,
      doc: parseDoc(query, type.doc),
      origin: type.origin
    };
    if (type.types) for (var i = type.types.length - 1; i >= 0; --i) {
      var tp = type.types[i];
      storeTypeDocs(query, tp, result);
      if (!span) span = getSpan(tp);
    }

    if (span && span.node) {
      // refers to a loaded file
      var spanFile = span.node.sourceFile || srv.fileMap[span.origin];
      var start = outputPos(query, spanFile, span.node.start),
          end = outputPos(query, spanFile, span.node.end);
      result.start = start;
      result.end = end;
      result.file = span.origin;
      var cxStart = Math.max(0, span.node.start - 50);
      result.contextOffset = span.node.start - cxStart;
      result.context = spanFile.text.slice(cxStart, cxStart + 50);
    } else if (span) {
      // external
      result.file = span.origin;
      storeSpan(srv, query, span, result);
    }

    return clean(result);
  }