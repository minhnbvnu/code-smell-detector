function diffWithUnstable(version1, version2) {
  if ((_semver || _load_semver()).default.eq(version1, version2) === false) {
    const v1 = (_semver || _load_semver()).default.parse(version1);
    const v2 = (_semver || _load_semver()).default.parse(version2);

    if (v1 != null && v2 != null) {
      const isPreRelease = v1.prerelease.length > 0 || v2.prerelease.length > 0;
      const preMajor = v1.major === 0 || v2.major === 0;
      const preMinor = preMajor && (v1.minor === 0 || v2.minor === 0);

      let diff = null;

      if (v1.major !== v2.major) {
        diff = 'major';
      } else if (v1.minor !== v2.minor) {
        if (preMajor) {
          // If the major version number is zero (0.x.x), treat a change
          // of the minor version number as a major change.
          diff = 'major';
        } else {
          diff = 'minor';
        }
      } else if (v1.patch !== v2.patch) {
        if (preMinor) {
          // If the major & minor version numbers are zero (0.0.x), treat a change
          // of the patch version number as a major change.
          diff = 'major';
        } else if (preMajor) {
          // If the major version number is zero (0.x.x), treat a change
          // of the patch version number as a minor change.
          diff = 'minor';
        } else {
          diff = 'patch';
        }
      }

      if (isPreRelease) {
        if (diff != null) {
          diff = PRE_RELEASES[diff];
        } else {
          diff = 'prerelease';
        }
      }

      return diff;
    }
  }

  return null;
}