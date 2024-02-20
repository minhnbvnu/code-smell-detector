function addDependencies(pkgDeps, moduleDeps, assertMatching = true) {
  Object.keys(moduleDeps).forEach(dep => {
    // Internal dependencies should be ignored.
    if (moduleNames.has(dep)) {
      return;
    }
    const currentDep = pkgDeps[dep];
    const moduleDep = moduleDeps[dep];
    if (assertMatching) {
      assert(
        currentDep == null || currentDep === moduleDep,
        `Mismatched dependency ${dep}: ${currentDep} vs ${moduleDep}`,
      );
    }
    pkgDeps[dep] = moduleDep;
  });
}