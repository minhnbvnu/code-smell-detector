function prerelease() {
  try {
    return semver.prerelease(process.version)
  } catch (e) {
    _logWarn(e, 'Bad process version for prelease check.')
    return false
  }
}