function findInScopes(class_, name) {
        var parts = name.split(".");
        var currentScope = class_.scope,
          found;
        while (currentScope) {
          if (currentScope.hasOwnProperty(parts[0])) {
            found = currentScope[parts[0]];
            break
          }
          currentScope = currentScope.scope
        }
        if (found === undef) found = globalScope[parts[0]];
        for (var i = 1, l = parts.length; i < l && found; ++i) found = found.inScope[parts[i]];
        return found
      }