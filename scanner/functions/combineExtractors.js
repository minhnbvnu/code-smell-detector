function combineExtractors() {
    for (var _len2 = arguments.length, extractors = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      extractors[_key2] = arguments[_key2];
    }

    return function (m) {
      return extractors.reduce(function (_ref, ex) {
        var mergedVals = _ref[0],
            mergedZone = _ref[1],
            cursor = _ref[2];

        var _ex = ex(m, cursor),
            val = _ex[0],
            zone = _ex[1],
            next = _ex[2];

        return [Object.assign(mergedVals, val), mergedZone || zone, next];
      }, [{}, null, 1]).slice(0, 2);
    };
  }