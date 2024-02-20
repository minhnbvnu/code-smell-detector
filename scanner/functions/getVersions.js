function getVersions(pkg) {
  var versions = Object.keys(pkg.packages || {}).sort(function(a, b) {
    return semver.compare(b, a);
  });
  if (!pkg.tag) {
    return versions;
  }
  return versions.filter(function(version) {
    return pkg.packages[version].tag === pkg.tag;
  });
}