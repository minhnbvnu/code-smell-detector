function getLatest (current, versions, opts) {
  var stable = current
  var latest = versions[versions.length - 1]

  if (!isStable(stable)) {
    stable = getLatestStable(versions)
  }

  // getLatestStable might not have found a stable version
  if (stable) {
    // Latest is the most recent version with higher version than stable
    for (var i = versions.length - 1; i >= 0; i--) {
      // If !opts.loose then this may throw
      if (semver.gt(versions[i], stable, opts.loose)) {
        latest = versions[i]
        break
      }
    }
  }

  return { latest: latest, stable: stable }
}