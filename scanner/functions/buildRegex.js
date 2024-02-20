function buildRegex(units) {
    var re = units.map(function (u) {
      return u.regex;
    }).reduce(function (f, r) {
      return f + "(" + r.source + ")";
    }, "");
    return ["^" + re + "$", units];
  }