function getScopeLevel(p) {
        var i = 0;
        while (p) {
          ++i;
          p = p.scope
        }
        return i
      }