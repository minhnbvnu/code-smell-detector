function jsdocInterpretComments(node, scope, aval, comments) {
    var type, args, ret, foundOne, self, parsed;

    for (var i = 0; i < comments.length; ++i) {
      var comment = comments[i];
      var decl = /(?:\n|\*)\s*@(type|param|arg(?:ument)?|returns?|this|class|constructor)(?:\s*?\n|\s+(.*))/g, m;
      while (m = decl.exec(comment)) {
        if (m[1] == "class" || m[1] == "constructor") {
          self = foundOne = true;
          continue;
        }

        if (m[2] === undefined) continue; // to avoid tags that require a type argument.

        if (m[1] == "this" && (parsed = parseType(scope, m[2], 0))) {
          self = parsed;
          foundOne = true;
          continue;
        }

        if (!(parsed = parseTypeOuter(scope, m[2]))) continue;
        foundOne = true;

        switch(m[1]) {
        case "returns": case "return":
          ret = parsed; break;
        case "type":
          type = parsed; break;
        case "param": case "arg": case "argument":
            // Possible jsdoc param name situations:
            // employee
            // [employee]
            // [employee=John Doe]
            // employee.name
            // employees[].name
            var name = m[2].slice(parsed.end).match(/^\s*(\[?)\s*([^\[\]\s=]+(\[\][^\[\]\s=]+)?)\s*(?:=[^\]]+\s*)?(\]?).*/);
            if (!name) continue;
            var argname = name[2] + (parsed.isOptional || (name[1] === '[' && name[4] === ']') ? "?" : "");

            // Check to see if the jsdoc is indicating a property of a previously documented parameter
            var isObjProp = false;
            var parts = argname.split('.');
            if (args && parts.length == 2) {
              var objname = parts[0];
              argname = parts[1];

              // Go through each of the previously found parameter to find the
              // object or array for which this new parameter should be a part
              // of
              var key, value;
              for (key in args) {
                value = args[key];

                if (key === objname && value.type instanceof infer.Obj) {
                  isObjProp = true;
                  parsed.type.propagate(value.type.defProp(argname));
                }
                else if (key + '[]' === objname && value.type instanceof infer.Arr) {
                  isObjProp = true;
                  parsed.type.propagate(value.type.getProp("<i>").getType().defProp(argname));
                }
              }
            }
            if (!isObjProp) {
              (args || (args = Object.create(null)))[argname] = parsed;
            }
          break;
        }
      }
    }

    if (foundOne) applyType(type, self, args, ret, node, aval);
  }