function getVersionsInRange (range, versions, loose) {
  return versions.filter(function (v) {
    return semver.satisfies(v, range, loose)
  })
}