function getReleaseVersion(version) {
  let releaseVersions;

  if (isBetaVersion(version)) {
    releaseVersions = getNextVersionFromBetaVersion(version);
  } else {
    releaseVersions = getNextVersion(version);
  }

  return releaseVersions;
}