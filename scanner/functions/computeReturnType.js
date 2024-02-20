function computeReturnType(funcNode, argNodes, scope) {
    var fn = findType(funcNode, scope).getFunctionType();
    if (!fn) return ANull;
    var result = fn.retval;

    if (fn.computeRet) {
      for (var i = 0, args = []; i < argNodes.length; ++i) args.push(findType(argNodes[i], scope));

      var self = ANull;
      if (funcNode.type == "MemberExpression") self = findType(funcNode.object, scope);
      result = fn.computeRet(self, args, argNodes);
    }

    return maybeIterator(fn, result);
  }