function testEngine(name, range, versions, looseSemver) {
  const actual = versions[name];
  if (!actual) {
    return false;
  }

  if (!semver.valid(actual, looseSemver)) {
    return false;
  }

  if (semver.satisfies(actual, range, looseSemver)) {
    return true;
  }

  if (name === 'yarn' && (0, (_semver || _load_semver()).satisfiesWithPrereleases)(actual, range, looseSemver)) {
    return true;
  }

  if (name === 'node' && semver.gt(actual, '1.0.0', looseSemver)) {
    // WARNING: this is a massive hack and is super gross but necessary for compatibility
    // some modules have the `engines.node` field set to a caret version below semver major v1
    // eg. ^0.12.0. this is problematic as we enforce engines checks and node is now on version >=1
    // to allow this pattern we transform the node version to fake ones in the minor range 10-13
    const major = semver.major(actual, looseSemver);
    const fakes = [`0.10.${major}`, `0.11.${major}`, `0.12.${major}`, `0.13.${major}`];
    for (var _iterator2 = fakes, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      const actualFake = _ref2;

      if (semver.satisfies(actualFake, range, looseSemver)) {
        return true;
      }
    }
  }

  // incompatible version
  return false;
}