function satisfiesWithPrereleases(version, range, loose = false) {
  let semverRange;
  try {
    // $FlowFixMe: Add a definition for the Range class
    semverRange = new (_semver || _load_semver()).default.Range(range, loose);
  } catch (err) {
    return false;
  }

  if (!version) {
    return false;
  }
  let semverVersion;
  try {
    semverVersion = new (_semver || _load_semver()).default.SemVer(version, semverRange.loose);
  } catch (err) {
    return false;
  }

  // A range has multiple sets of comparators. A version must satisfy all comparators in a set
  // and at least one set to satisfy the range.
  return semverRange.set.some(comparatorSet => {
    // node-semver converts ~ and ^ ranges into pairs of >= and < ranges but the upper bounds don't
    // properly exclude prerelease versions. For example, "^1.0.0" is converted to ">=1.0.0 <2.0.0",
    // which includes "2.0.0-pre" since prerelease versions are lower than their non-prerelease
    // counterparts. As a practical workaround we make upper-bound ranges exclude prereleases and
    // convert "<2.0.0" to "<2.0.0-0", for example.
    comparatorSet = comparatorSet.map(comparator => {
      if (comparator.operator !== '<' || !comparator.value || comparator.semver.prerelease.length) {
        return comparator;
      }

      // "0" is the lowest prerelease version
      comparator.semver.inc('pre', 0);

      const comparatorString = comparator.operator + comparator.semver.version;
      // $FlowFixMe: Add a definition for the Comparator class
      return new (_semver || _load_semver()).default.Comparator(comparatorString, comparator.loose);
    });

    return !comparatorSet.some(comparator => !comparator.test(semverVersion));
  });
}