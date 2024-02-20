function combo(fns) {
  if (fns.length < 2) {
    return fns[0];
  }

  return function () {
    for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
      rest[_key] = arguments[_key];
    }

    for (var i = 0, l = fns.length; i < l; i++) {
      fns[i].apply(this, rest);
    }
  };
}