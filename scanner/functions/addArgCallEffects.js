function addArgCallEffects(type) {
    if (type instanceof infer.Fn && type.args) for (var i = 0; i < type.args.length; ++i) {
      var arg = type.args[i];
      if (arg instanceof infer.Fn && arg.args && arg.args.length) addArgCallEffect(type, i);
    }
  }