function getNextVersion(version) {
  const nextVersions = [];

  ['patch', 'minor', 'major'].forEach((type) =>
    nextVersions.push(
      semver.inc(version, type),
      semver.inc(version, `pre${type}`, 'beta')
    )
  );

  return nextVersions;
}