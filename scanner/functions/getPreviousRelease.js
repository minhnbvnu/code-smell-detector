function getPreviousRelease(version, allReleases) {
  const versionIsStable = semver.prerelease(version) === null;

  // Make sure versions are sorted before using them
  allReleases.sort((v1, v2) => semver.rcompare(v1.name, v2.name));

  for (let release of allReleases) {
    if (versionIsStable && semver.prerelease(release.name)) {
      continue;
    }

    if (semver.lt(release.name, version)) {
      return release;
    }
  }

  return null;
}