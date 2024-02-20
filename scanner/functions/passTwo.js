function passTwo(base, spec, path) {
    if (base.isShell) {
      delete base.isShell;
      var tp = spec["!type"];
      if (tp) {
        parseType(tp, path, base);
      } else {
        var proto = spec["!proto"] && parseType(spec["!proto"]);
        infer.Obj.call(base, proto instanceof infer.Obj ? proto : true, path);
      }
    }

    var effects = spec["!effects"];
    if (effects && base instanceof infer.Fn) for (var i = 0; i < effects.length; ++i)
      parseEffect(effects[i], base);
    copyInfo(spec, base);

    for (var name in spec) if (hop(spec, name) && name.charCodeAt(0) != 33) {
      var inner = spec[name], known = base.defProp(name), innerPath = path ? path + "." + name : name;
      if (typeof inner == "string") {
        if (known.isEmpty()) parseType(inner, innerPath).propagate(known);
      } else {
        if (!isSimpleAnnotation(inner))
          passTwo(known.getObjType(), inner, innerPath);
        else if (known.isEmpty())
          parseType(inner["!type"], innerPath, null, true).propagate(known);
        else
          continue;
        if (inner["!doc"]) known.doc = inner["!doc"];
        if (inner["!url"]) known.url = inner["!url"];
        if (inner["!span"]) known.span = inner["!span"];
      }
    }
    return base;
  }