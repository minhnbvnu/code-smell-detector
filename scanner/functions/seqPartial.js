function seqPartial(x) {
    for (var _len2 = arguments.length, fns = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      fns[_key2 - 1] = arguments[_key2];
    }

    for (var i = 0, n = fns.length; isDefined(x) && i < n; ++i) {
      x = fns[i](x);
    }return x;
  }