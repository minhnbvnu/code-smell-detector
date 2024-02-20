function inList(list) {
      for (var v = list; v; v = v.next)
        { if (v.name == varname) { return true; } }
      return false;
    }