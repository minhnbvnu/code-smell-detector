function compareSemVer(version, minimum) {
  version = parseSemVer(version);
  minimum = parseSemVer(minimum);

  var versionNum = (version.major * 10000 * 10000) +
    (version.minor * 10000) + version.patch;
  var minimumNum = (minimum.major * 10000 * 10000) +
    (minimum.minor * 10000) + minimum.patch;

  return (versionNum >= minimumNum);
}