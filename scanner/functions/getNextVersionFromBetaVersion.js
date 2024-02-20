function getNextVersionFromBetaVersion(version) {
  return [
    semver.inc(version, 'patch'),
    semver.inc(version, 'prerelease', 'beta'),
  ];
}