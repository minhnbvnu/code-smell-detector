function connectParams(node, scope) {
    for (var i = 0; i < node.params.length; i++) {
      var param = node.params[i];
      if (param.type == "Identifier") continue;
      connectPattern(param, scope, node.scope.fnType.args[i]);
    }
  }