function createMatcher (relative, patterns) {
  if (!Array.isArray(patterns) || patterns.length === 0) {
    return () => true
  }

  return file => {
    const relativepath = path.relative(relative, file)
    return multimatch(relativepath, patterns, { dot: true }).length > 0
  }
}