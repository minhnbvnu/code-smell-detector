function similarType(a, b, depth) {
    if (!a || depth >= 5) return b;
    if (!a || a == b) return a;
    if (!b) return a;
    if (a.constructor != b.constructor) return false;

    if (a.constructor == Arr) {
      var innerA = a.getProp("<i>").getType(false);
      if (!innerA) return b;
      var innerB = b.getProp("<i>").getType(false);
      if (!innerB || similarType(innerA, innerB, depth + 1)) return b;
    } else if (a.constructor == Obj) {
      var propsA = 0,
          propsB = 0,
          same = 0;

      for (var prop in a.props) {
        propsA++;
        if (prop in b.props && similarAVal(a.props[prop], b.props[prop], depth + 1)) same++;
      }

      for (var prop in b.props) propsB++;

      if (propsA && propsB && same < Math.max(propsA, propsB) / 2) return false;
      return propsA > propsB ? a : b;
    } else if (a.constructor == Fn) {
      if (a.args.length != b.args.length || !a.args.every(function (tp, i) {
        return similarAVal(tp, b.args[i], depth + 1);
      }) || !similarAVal(a.retval, b.retval, depth + 1) || !similarAVal(a.self, b.self, depth + 1)) return false;
      return a;
    } else {
      return false;
    }
  }