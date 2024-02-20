function satisfies(check) {
  try {
    return semver.satisfies(process.version, check)
  } catch (e) {
    _logWarn(e, 'Bad process version for satisfies check.')
    return false
  }
}