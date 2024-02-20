function jsdocParseTypedefs(text, scope) {
    var cx = infer.cx();

    var re = /\s@typedef\s+(.*)/g, m;
    while (m = re.exec(text)) {
      var parsed = parseTypeOuter(scope, m[1]);
      var name = parsed && m[1].slice(parsed.end).match(/^\s*(\S+)/);
      if (name && parsed.type instanceof infer.Obj) {
        var rest = text.slice(m.index + m[0].length);
        while (m = /\s+@prop(?:erty)?\s+(.*)/.exec(rest)) {
          var propType = parseTypeOuter(scope, m[1]), propName;
          if (propType && (propName = m[1].slice(propType.end).match(/^\s*(\S+)/)))
            propType.type.propagate(parsed.type.defProp(propName[1]));
          rest = rest.slice(m[0].length);
        }
        cx.parent.mod.jsdocTypedefs[name[1]] = parsed.type;
      }
    }
  }