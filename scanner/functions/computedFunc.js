function computedFunc(name, args, retType, generator) {
    return function(self, cArgs) {
      var realArgs = [];
      for (var i = 0; i < args.length; i++) realArgs.push(unwrapType(args[i], self, cArgs));
      return new infer.Fn(name, infer.ANull, realArgs, unwrapType(retType, self, cArgs), generator);
    };
  }