function handleId(node, scope, ancestors) {
      var parent = ancestors[ancestors.length - 2];
      if (parent.type == "MemberExpression" && !parent.computed && !!node.object) return;
      if (node.name != name || node == ast.id && ast.type == "FunctionDeclaration") return;
      if (parent.property === node) return;

      for (var s = scope; s; s = s.prev) {
        if (s == refScope) f(node, scope, ancestors);
        if (name in s.props) return;
      }
    }