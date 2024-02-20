function inferLicense(license) {
  // check if we have any explicit licenses
  const cleanLicense = clean(license);
  for (const licenseName in (_licenses || _load_licenses()).default) {
    const testLicense = (_licenses || _load_licenses()).default[licenseName];
    if (cleanLicense.search(testLicense) >= 0) {
      return licenseName;
    }
  }

  // infer based on some keywords
  for (const licenseName in REGEXES) {
    for (var _iterator = REGEXES[licenseName], _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      const regex = _ref;

      if (license.search(regex) >= 0) {
        return `${licenseName}*`;
      }
    }
  }

  return null;
}