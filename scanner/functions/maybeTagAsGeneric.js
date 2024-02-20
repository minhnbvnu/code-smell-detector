function maybeTagAsGeneric(fn) {
    var target = fn.retval;
    if (target == ANull || fn.isArrowFn()) return;
    var targetInner, asArray;
    if (!target.isEmpty() && (targetInner = target.getType()) instanceof Arr) target = asArray = targetInner.getProp("<i>");

    function explore(aval, path, depth) {
      if (depth > 3 || !aval.forward) return;

      for (var i = 0; i < aval.forward.length; ++i) {
        var prop = aval.forward[i].propagatesTo();
        if (!prop) continue;
        var newPath = path,
            dest;

        if (prop instanceof AVal) {
          dest = prop;
        } else if (prop.target instanceof AVal) {
          newPath += prop.pathExt;
          dest = prop.target;
        } else continue;

        if (dest == target) return newPath;
        var found = explore(dest, newPath, depth + 1);
        if (found) return found;
      }
    }

    var foundPath = explore(fn.self, "!this", 0);

    for (var i = 0; !foundPath && i < fn.args.length; ++i) foundPath = explore(fn.args[i], "!" + i, 0);

    if (foundPath) {
      if (asArray) foundPath = "[" + foundPath + "]";
      var p = new def.TypeParser(foundPath);
      var parsed = p.parseType(true);
      fn.computeRet = parsed.apply ? parsed : function () {
        return parsed;
      };
      fn.computeRetSource = foundPath;
      return true;
    }
  }