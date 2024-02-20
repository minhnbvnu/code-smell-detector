function isValidNewVersion(oldVersion, newVersion, looseSemver, identifier) {
  return !!(semver.valid(newVersion, looseSemver) || semver.inc(oldVersion, newVersion, looseSemver, identifier));
}