function seq(x) {
    for (var _len = arguments.length, fns = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      fns[_key - 1] = arguments[_key];
    }

    for (var i = 0, n = fns.length; i < n; ++i) {
      x = fns[i](x);
    }return x;
  }