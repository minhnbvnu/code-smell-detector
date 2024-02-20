function descendProps(base, parts) {
    for (var i = 0; i < parts.length && base != infer.ANull; ++i) {
      var prop = parts[i];
      if (prop.charAt(0) == "!") {
        if (prop == "!proto") {
          base = (base instanceof infer.Obj && base.proto) || infer.ANull;
        } else {
          var fn = base.getFunctionType();
          if (!fn) {
            base = infer.ANull;
          } else if (prop == "!ret") {
            base = fn.retval && fn.retval.getType(false) || infer.ANull;
          } else {
            var arg = fn.args && fn.args[Number(prop.slice(1))];
            base = (arg && arg.getType(false)) || infer.ANull;
          }
        }
      } else if (base instanceof infer.Obj &&
                 (prop == "prototype" && base instanceof infer.Fn || base.hasProp(prop))) {
        var propVal = base.getProp(prop);
        if (!propVal || propVal.isEmpty())
          base = infer.ANull;
        else
          base = propVal.types[0];
      } else {
        base = infer.ANull;
      }
    }
    return base;
  }