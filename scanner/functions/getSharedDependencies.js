function getSharedDependencies(hoistManifests, transitiveKeys) {
  const sharedDependencies = new Set();
  for (var _iterator2 = hoistManifests, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
    var _ref5;

    if (_isArray2) {
      if (_i2 >= _iterator2.length) break;
      _ref5 = _iterator2[_i2++];
    } else {
      _i2 = _iterator2.next();
      if (_i2.done) break;
      _ref5 = _i2.value;
    }

    const _ref4 = _ref5;
    const info = _ref4[1];

    if (!transitiveKeys.has(info.key) && info.pkg.dependencies) {
      Object.keys(info.pkg.dependencies).forEach(dependency => {
        if (transitiveKeys.has(dependency) && !sharedDependencies.has(dependency)) {
          sharedDependencies.add(dependency);
        }
      });
    }
  }
  return sharedDependencies;
}