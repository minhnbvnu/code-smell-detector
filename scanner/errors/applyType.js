function applyType(type, self, args, ret, node, aval) {
    var fn;
    if (node.type == "VariableDeclaration") {
      var decl = node.declarations[0];
      if (decl.init && isFunExpr(decl.init)) fn = decl.init.scope.fnType;
    } else if (node.type == "FunctionDeclaration") {
      fn = node.scope.fnType;
    } else if (node.type == "AssignmentExpression") {
      if (isFunExpr(node.right))
        fn = node.right.scope.fnType;
    } else if (node.type == "CallExpression" || node.type === "ClassDeclaration") {
    } else { // An object property
      if (isFunExpr(node.value)) fn = node.value.scope.fnType;
    }

    if (fn && (args || ret || self)) {
      if (args) for (var i = 0; i < fn.argNames.length; ++i) {
        var name = fn.argNames[i], known = args[name];
        if (!known && (known = args[name + "?"]))
          fn.argNames[i] += "?";
        if (known) propagateWithWeight(known, fn.args[i]);
      }
      if (ret) {
        if (fn.retval == infer.ANull) fn.retval = new infer.AVal;
        propagateWithWeight(ret, fn.retval);
      }
      if (self === true) {
        var proto = fn.getProp("prototype").getObjType();
        self = proto && {type: infer.getInstance(proto, fn)};
      }
      if (self) propagateWithWeight(self, fn.self);
    } else if (type) {
      propagateWithWeight(type, aval);
    }
  }