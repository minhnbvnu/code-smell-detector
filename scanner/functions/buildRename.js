function buildRename(srv, query, file) {
    if (typeof query.newName != "string") throw ternError(".query.newName should be a string");
    var expr = findExprOrThrow(file, query);
    if (!expr || expr.node.type != "Identifier") throw ternError("Not at a variable.");
    var data = findRefsToVariable(srv, query, file, expr, query.newName),
        refs = data.refs;
    delete data.refs;
    data.files = srv.files.map(function (f) {
      return f.name;
    });
    var changes = data.changes = [];

    for (var i = 0; i < refs.length; ++i) {
      var use = refs[i];
      if (use.isShorthand) use.text = expr.node.name + ": " + query.newName;else use.text = query.newName;
      changes.push(use);
    }

    return data;
  }