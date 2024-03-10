function cleanDependencies(info, isRoot, reporter, warn) {
  // get dependency objects
  const depTypes = [];
  for (var _iterator2 = dependencyKeys, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
    var _ref2;

    if (_isArray2) {
      if (_i2 >= _iterator2.length) break;
      _ref2 = _iterator2[_i2++];
    } else {
      _i2 = _iterator2.next();
      if (_i2.done) break;
      _ref2 = _i2.value;
    }

    const type = _ref2;

    const deps = info[type];
    if (!deps || typeof deps !== 'object') {
      continue;
    }
    depTypes.push([type, deps]);
  }

  // aggregate all non-trivial deps (not '' or '*')
  const nonTrivialDeps = new Map();
  for (var _iterator3 = depTypes, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
    var _ref4;

    if (_isArray3) {
      if (_i3 >= _iterator3.length) break;
      _ref4 = _iterator3[_i3++];
    } else {
      _i3 = _iterator3.next();
      if (_i3.done) break;
      _ref4 = _i3.value;
    }

    const _ref3 = _ref4;
    const type = _ref3[0];
    const deps = _ref3[1];

    for (var _iterator5 = Object.keys(deps), _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
      var _ref7;

      if (_isArray5) {
        if (_i5 >= _iterator5.length) break;
        _ref7 = _iterator5[_i5++];
      } else {
        _i5 = _iterator5.next();
        if (_i5.done) break;
        _ref7 = _i5.value;
      }

      const name = _ref7;

      const version = deps[name];
      if (!nonTrivialDeps.has(name) && version && version !== '*') {
        nonTrivialDeps.set(name, { type, version });
      }
    }
  }

  // overwrite first dep of package with non-trivial version, remove the rest
  const setDeps = new Set();
  for (var _iterator4 = depTypes, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
    var _ref6;

    if (_isArray4) {
      if (_i4 >= _iterator4.length) break;
      _ref6 = _iterator4[_i4++];
    } else {
      _i4 = _iterator4.next();
      if (_i4.done) break;
      _ref6 = _i4.value;
    }

    const _ref5 = _ref6;
    const type = _ref5[0];
    const deps = _ref5[1];

    for (var _iterator6 = Object.keys(deps), _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
      var _ref8;

      if (_isArray6) {
        if (_i6 >= _iterator6.length) break;
        _ref8 = _iterator6[_i6++];
      } else {
        _i6 = _iterator6.next();
        if (_i6.done) break;
        _ref8 = _i6.value;
      }

      const name = _ref8;

      let version = deps[name];

      const dep = nonTrivialDeps.get(name);
      if (dep) {
        if (version && version !== '*' && version !== dep.version && isRoot) {
          // only throw a warning when at the root
          warn(reporter.lang('manifestDependencyCollision', dep.type, name, dep.version, type, version));
        }
        version = dep.version;
      }

      if (setDeps.has(name)) {
        delete deps[name];
      } else {
        deps[name] = version;
        setDeps.add(name);
      }
    }
  }
}