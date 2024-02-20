function isStable (version) {
  return !unstablePattern.test(version || '')
}