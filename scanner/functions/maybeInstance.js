function maybeInstance(type, path) {
    if (type instanceof infer.Fn && /(?:^|\.)[A-Z][^\.]*$/.test(path)) {
      var proto = type.getProp("prototype").getObjType();
      if (proto instanceof infer.Obj) return infer.getInstance(proto);
    }
    return type;
  }