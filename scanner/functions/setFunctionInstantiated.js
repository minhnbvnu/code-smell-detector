function setFunctionInstantiated(node, fn) {
    // Disconnect the arg avals, so that we can add info to them without side effects
    var refScope = node.scope;

    for (var i = 0; i < fn.args.length; ++i) fn.args[i] = new AVal();

    fn.self = new AVal();

    fn.computeRet = function (self, args) {
      // Prevent recursion
      return withDisabledComputing(fn, function () {
        var oldOrigin = cx.curOrigin;
        cx.curOrigin = fn.origin;
        var scope = node.scope ? node.scope : refScope;
        var scopeCopy = new Scope(scope.prev, scope.originNode);

        for (var v in scope.props) {
          var local = scopeCopy.defProp(v, scope.props[v].originNode);

          for (var i = 0; i < args.length; ++i) if (fn.argNames[i] == v && i < args.length) args[i].propagate(local);
        }

        var argNames = fn.argNames.length != args.length ? fn.argNames.slice(0, args.length) : fn.argNames;

        while (argNames.length < args.length) argNames.push("?");

        scopeCopy.fnType = new Fn(fn.name, self, args, argNames, ANull, fn.generator, fn.async);
        scopeCopy.fnType.originNode = fn.originNode;

        if (fn.arguments) {
          var argset = scopeCopy.fnType.arguments = new AVal();
          scopeCopy.defProp("arguments").addType(new Arr(argset));

          for (var i = 0; i < args.length; ++i) args[i].propagate(argset);
        }

        node.scope = scopeCopy;
        walk.recursive(node.body, scopeCopy, null, scopeGatherer);
        walk.recursive(node.body, scopeCopy, null, inferWrapper);
        cx.curOrigin = oldOrigin;
        return scopeCopy.fnType.retval;
      });
    };
  }