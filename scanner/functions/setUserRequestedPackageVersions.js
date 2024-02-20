function setUserRequestedPackageVersions(deps, args, latest, packagePatterns, reporter) {
  args.forEach(requestedPattern => {
    let found = false;
    let normalized = (0, (_normalizePattern || _load_normalizePattern()).normalizePattern)(requestedPattern);

    // if the user specified a package name without a version range, then that implies "latest"
    // but if the latest flag is not passed then we need to use the version range from package.json
    if (!normalized.hasVersion && !latest) {
      packagePatterns.forEach(packagePattern => {
        const packageNormalized = (0, (_normalizePattern || _load_normalizePattern()).normalizePattern)(packagePattern.pattern);
        if (packageNormalized.name === normalized.name) {
          normalized = packageNormalized;
        }
      });
    }

    const newPattern = `${normalized.name}@${normalized.range}`;

    // if this dependency is already in the outdated list,
    // just update the upgradeTo to whatever version the user requested.
    deps.forEach(dep => {
      if (normalized.hasVersion && dep.name === normalized.name) {
        found = true;
        dep.upgradeTo = newPattern;
        reporter.verbose(reporter.lang('verboseUpgradeBecauseRequested', requestedPattern, newPattern));
      }
    });

    // if this dependency was not in the outdated list,
    // then add a new entry
    if (normalized.hasVersion && !found) {
      deps.push({
        name: normalized.name,
        wanted: '',
        latest: '',
        url: '',
        hint: '',
        range: '',
        current: '',
        upgradeTo: newPattern,
        workspaceName: '',
        workspaceLoc: ''
      });
      reporter.verbose(reporter.lang('verboseUpgradeBecauseRequested', requestedPattern, newPattern));
    }
  });
}