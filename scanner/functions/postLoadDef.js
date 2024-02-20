function postLoadDef(data) {
    var defs = data["!typedef"];
    var cx = infer.cx(), orig = data["!name"];
    if (defs) for (var name in defs)
      cx.parent.mod.jsdocTypedefs[name] =
        maybeInstance(infer.def.parse(defs[name], orig, name), name);
  }