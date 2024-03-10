function canonicalType(types) {
    var arrays = 0,
        fns = 0,
        objs = 0,
        prim = null;

    for (var i = 0; i < types.length; ++i) {
      var tp = types[i];
      if (tp instanceof Arr) ++arrays;else if (tp instanceof Fn) ++fns;else if (tp instanceof Obj) ++objs;else if (tp instanceof Prim) {
        if (prim && tp.name != prim.name) return null;
        prim = tp;
      }
    }

    var kinds = (arrays && 1) + (fns && 1) + (objs && 1) + (prim && 1);
    if (kinds > 1) return null;
    if (prim) return prim;
    var maxScore = 0,
        maxTp = null;

    for (var i = 0; i < types.length; ++i) {
      var tp = types[i],
          score = 0;

      if (arrays) {
        score = tp.getProp("<i>").isEmpty() ? 1 : 2;
      } else if (fns) {
        score = 1;

        for (var j = 0; j < tp.args.length; ++j) if (!tp.args[j].isEmpty()) ++score;

        if (!tp.retval.isEmpty()) ++score;
      } else if (objs) {
        score = tp.name ? 100 : 2;
      }

      if (score >= maxScore) {
        maxScore = score;
        maxTp = tp;
      }
    }

    return maxTp;
  }