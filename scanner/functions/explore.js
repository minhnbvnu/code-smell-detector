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