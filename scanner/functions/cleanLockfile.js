function cleanLockfile(lockfile, deps, packagePatterns, reporter) {
  function cleanDepFromLockfile(pattern, depth) {
    const lockManifest = lockfile.getLocked(pattern);
    if (!lockManifest || depth > 1 && packagePatterns.some(packagePattern => packagePattern.pattern === pattern)) {
      reporter.verbose(reporter.lang('verboseUpgradeNotUnlocking', pattern));
      return;
    }

    const dependencies = Object.assign({}, lockManifest.dependencies || {}, lockManifest.optionalDependencies || {});
    const depPatterns = Object.keys(dependencies).map(key => `${key}@${dependencies[key]}`);
    reporter.verbose(reporter.lang('verboseUpgradeUnlocking', pattern));
    lockfile.removePattern(pattern);
    depPatterns.forEach(pattern => cleanDepFromLockfile(pattern, depth + 1));
  }

  const patterns = deps.map(dep => dep.upgradeTo);
  patterns.forEach(pattern => cleanDepFromLockfile(pattern, 1));
}