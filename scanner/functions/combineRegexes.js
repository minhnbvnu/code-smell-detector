function combineRegexes() {
    for (var _len = arguments.length, regexes = new Array(_len), _key = 0; _key < _len; _key++) {
      regexes[_key] = arguments[_key];
    }

    var full = regexes.reduce(function (f, r) {
      return f + r.source;
    }, "");
    return RegExp("^" + full + "$");
  }