function findRefsToVariable(srv, query, file, expr, isRename) {
    var name = expr.node.name;

    for (var scope = expr.state; scope && !(name in scope.props); scope = scope.prev) {}

    if (!scope) throw ternError("Could not find a definition for " + name);
    var type,
        refs = [];

    function storeRef(file) {
      return function (node, scopeHere, ancestors) {
        var value = {
          file: file.name,
          start: outputPos(query, file, node.start),
          end: outputPos(query, file, node.end)
        };

        if (isRename) {
          for (var s = scopeHere; s != scope; s = s.prev) {
            var exists = s.hasProp(isRename);
            if (exists) throw ternError("Renaming `" + name + "` to `" + isRename + "` would make a variable at line " + (asLineChar(file, node.start).line + 1) + " point to the definition at line " + (asLineChar(file, exists.name.start).line + 1));
          }

          var parent = ancestors[ancestors.length - 2];
          if (parent && parent.type == "Property" && parent.key == parent.value) value.isShorthand = true;
        }

        refs.push(value);
      };
    }

    if (scope.originNode) {
      type = "local";

      if (isRename) {
        for (var prev = scope.prev; prev; prev = prev.prev) if (isRename in prev.props) break;

        if (prev) infer.findRefs(scope.originNode, scope, isRename, prev, function (node) {
          throw ternError("Renaming `" + name + "` to `" + isRename + "` would shadow the definition used at line " + (asLineChar(file, node.start).line + 1));
        });
      }

      infer.findRefs(scope.originNode, scope, name, scope, storeRef(file));
    } else {
      type = "global";

      if (query.onlySourceFile) {
        infer.findRefs(file.ast, file.scope, name, scope, storeRef(file));
      } else {
        for (var i = 0; i < srv.files.length; ++i) {
          var cur = srv.files[i];
          infer.findRefs(cur.ast, cur.scope, name, scope, storeRef(cur));
        }
      }
    }

    return {
      refs: refs,
      type: type,
      name: name
    };
  }