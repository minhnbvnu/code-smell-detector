function findExprAround(file, query, wide) {
    var start = query.start && resolvePos(file, query.start),
        end = resolvePos(file, query.end);
    var expr = null;
    var around = infer.findExpressionAround(file.ast, start, end, file.scope);
    if (around && !inBody(around.node, end) && (around.node.type == "ObjectExpression" || wide || (start == null ? end : start) - around.node.start < 20 || around.node.end - end < 20)) expr = around;
    return expr;
  }