function addArgCallEffect(type, argNum) {
    addEffect(type, function(_self, args) {
      if (args[argNum]) args[argNum].propagate(
        new infer.IsCallee(infer.cx().topScope, type.args[argNum].args, null, infer.ANull));
    });
  }