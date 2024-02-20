function _doTest(globalInclude, globalExclude, destConfig, key) {
  // Check for exclusion of the attribute.
  if (globalExclude === EXACT_MATCH) {
    return false
  }
  const destExclude = _matchRules(destConfig.exclude, key)
  if (destExclude === EXACT_MATCH) {
    return false
  }

  // Then check for inclusion of the attribute.
  if (globalInclude === EXACT_MATCH) {
    return true
  }
  const destInclude = _matchRules(destConfig.include, key)
  if (destInclude === EXACT_MATCH) {
    return true
  }

  // Did any rule match this key? If not, this is a no-match.
  if (
    globalExclude === NO_MATCH &&
    globalInclude === NO_MATCH &&
    destExclude === NO_MATCH &&
    destInclude === NO_MATCH
  ) {
    return NO_MATCH
  }

  // Something has matched this key, so compare the strength of any wildcard
  // matches that have happened.
  return (
    // If destination include is a better match than either exclude, it's in!
    (destInclude > destExclude && destInclude >= globalExclude) ||
    // If global include is a better match than either exclude, it's in!
    (globalInclude > destExclude && globalInclude > globalExclude)
  )
}