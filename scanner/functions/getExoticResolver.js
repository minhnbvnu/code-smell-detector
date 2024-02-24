function getExoticResolver(pattern) {
  for (var _iterator = exotics, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    const Resolver = _ref;

    if (Resolver.isVersion(pattern)) {
      return Resolver;
    }
  }
  return null;
}