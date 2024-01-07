function getBranchForVersion(version) {
  let parsedVersion = version;
  if (!(version instanceof semver.SemVer)) {
    parsedVersion = semver.parse(version);
  }

  return `${parsedVersion.major}.${parsedVersion.minor}-releases`;
}