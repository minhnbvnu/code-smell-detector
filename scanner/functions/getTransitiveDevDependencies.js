function getTransitiveDevDependencies(packageManifest, workspaceLayout, lockfile) {
  // Enumerate the top-level package manifest as well as any workspace manifests
  const manifests = [packageManifest];
  if (workspaceLayout) {
    for (var _iterator = Object.keys(workspaceLayout.workspaces), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      const name = _ref;

      manifests.push(workspaceLayout.workspaces[name].manifest);
    }
  }

  // Collect all the top-level production and development dependencies across all manifests
  let productionRoots = [];
  let developmentRoots = [];
  for (var _iterator2 = manifests, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
    var _ref2;

    if (_isArray2) {
      if (_i2 >= _iterator2.length) break;
      _ref2 = _iterator2[_i2++];
    } else {
      _i2 = _iterator2.next();
      if (_i2.done) break;
      _ref2 = _i2.value;
    }

    const manifest = _ref2;

    productionRoots = productionRoots.concat(dependenciesObjectToPatterns(manifest.dependencies));
    productionRoots = productionRoots.concat(dependenciesObjectToPatterns(manifest.optionalDependencies));
    developmentRoots = developmentRoots.concat(dependenciesObjectToPatterns(manifest.devDependencies));
  }

  // Enumerate all the transitive production and development dependencies
  const productionDependencies = getTransitiveDependencies(lockfile, productionRoots);
  const developmentDependencies = getTransitiveDependencies(lockfile, developmentRoots);

  // Exclude any development dependencies that are also production dependencies
  return setDifference(developmentDependencies, productionDependencies);
}