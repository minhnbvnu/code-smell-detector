function isUpdated (dep, opts) {
  opts = opts || {}

  var required = dep.required || '*'

  // TODO: Handle tags correctly
  if (required !== 'latest' && required !== '*') {
    var range = semver.validRange(required, opts.loose) || ''
    var version = opts.stable ? dep.stable : dep.latest

    if (version) {
      if (!range) {
        return true
      } else if (!semver.satisfies(version, range, opts.loose)) {
        if (opts.stable && semver.gtr(version, range, opts.loose)) {
          return true
        } else if (!opts.stable) {
          return true
        }
      }
    }
  }
  return false
}